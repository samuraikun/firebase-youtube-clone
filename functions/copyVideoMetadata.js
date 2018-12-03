const functions = require('firebase-functions');
const serviceAccount = require('./config/service_account.json');
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
const firestore = admin.firestore();

exports.onUsersVideoCreate = functions.firestore.document('users/{userId}/videos/{videoId}').onCreate(async (snapshot, context) => {
  await copyToRootWithUsersVideoSnapshot(snapshot, context);
});

exports.onUsersVideoUpdate = functions.firestore.document('users/{userId}/videos/{videoId}').onUpdate(async (change, context) => {
  await copyToRootWithUsersVideoSnapshot(change.after, context);
});

async function copyToRootWithUsersVideoSnapshot(snapshot, context) {
  const userId = context.params.userId;
  const videoId = context.params.videoId;
  const video = snapshot.data();
  video.userRef = firestore.collection('users').doc(userId);

  await firestore.collection('videos').doc(videoId).set(video, { merge: true });
}