const functions = require('firebase-functions');
const path = require('path');
const os = require('os');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static');
const UUID = require('uuid-v4');
const serviceAccount = require('./config/service_account.json');

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({keyFilename: './config/service_account.json'});

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-reacty-videos.firebaseio.com"
});
admin.firestore().settings({timestampsInSnapshots: true});

function promisifyCommand(command) {
  return new Promise((resolve, reject) => {
    command.on('end', resolve).on('error', reject).run();
  });
}

exports.transcodeVideo = functions.storage.object().onFinalize(async object => {
  try {
    if (!object.contentType.includes('video') || object.contentType.endsWith('mp4')) {
      console.log('quit execution!')
      return;
    }

    const bucketName = object.bucket;
    const bucket = gcs.bucket(bucketName);
    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const videoFile = bucket.file(filePath);

    const targetTempFileName = `${fileName.replace(/\.[^/.]+$/, '')}_output.mp4`;
    const targetTempFilePath = path.join(os.tmpdir(), targetTempFileName);
    const targetTranscodedFilePath = `transcoded-videos/${targetTempFileName}`;
    const targetStorageFilePath = path.join(path.dirname(targetTranscodedFilePath), targetTempFileName);

    await videoFile.download({destination: tempFilePath});

    const command = ffmpeg(tempFilePath)
      .setFfmpegPath(ffmpeg_static.path)
      .format('mp4')
      .output(targetTempFilePath);

    await promisifyCommand(command);

    const token = UUID();
    await bucket.upload(targetTempFilePath, {
      destination: targetStorageFilePath,
      metadata: {
        contentType: 'video/mp4',
        metadata: {
          firebaseStorageDownloadTokens: token
        }
      }
    });

    let metadata = await videoFile.getMetadata();
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(targetTranscodedFilePath)}?alt=media&token=${token}`;
    metadata = Object.assign(metadata[0], {downloadURL: downloadURL});

    await admin.firestore().collection('videos').add(metadata);

    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(targetTempFilePath);

    console.log('Transcode execution was finished!');
  } catch (error) {
    console.log(error);
    return;
  }
});