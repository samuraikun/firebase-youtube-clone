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
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-reacty-videos.firebaseio.com"
  });
  admin.firestore().settings({timestampsInSnapshots: true});
} catch (error) {
  console.log(error);
}

function promisifyCommand(command) {
  return new Promise((resolve, reject) => {
    command.on('end', resolve).on('error', reject).run();
  });
}

async function saveVideoMetadata(userToken, metadata) {
  const decodedToken = await admin.auth().verifyIdToken(userToken);
  const user_id = decodedToken.uid;
  const videoRef = admin.firestore().doc(`users/${user_id}`).collection('videos').doc();
  metadata = Object.assign(metadata, { uid: videoRef.id });
  
  await videoRef.set(metadata, { merge: true });
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

    let transcodedVideoFile = await bucket.file(targetStorageFilePath);
    let metadata = await transcodedVideoFile.getMetadata();
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(targetTranscodedFilePath)}?alt=media&token=${token}`;
    metadata = Object.assign(metadata[0], {downloadURL: downloadURL});
    const userToken = object.metadata.idToken;

    await saveVideoMetadata(userToken, metadata);

    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(targetTempFilePath);

    console.log('Transcode execution was finished!');
  } catch (error) {
    console.log(error);
    return;
  }
});