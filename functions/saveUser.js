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

exports.saveUser = functions.auth.user().onCreate(async user => {
  try {
    const result = await admin.firestore().doc(`users/${user.uid}`).create({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerData: {
        providerId: user.providerData[0].providerId,
        uid: user.providerData[0].uid
      },
      disabled: user.disabled
    });

    console.log(`Save User info! Document written at: ${result.writeTime.toDate()}`);
  } catch (error) {
    console.log(error);
  }
});