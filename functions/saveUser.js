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

const defaultUserIcon = 'https://firebasestorage.googleapis.com/v0/b/fir-clone-1a266.appspot.com/o/default-user-icons%2F1.png?alt=media&token=b5e090f4-d2b1-4544-92bd-379a3d22b470'

exports.saveUser = functions.auth.user().onCreate(async user => {
  try {
    const result = await admin.firestore().doc(`users/${user.uid}`).create({
      uid: user.uid,
      displayName: user.displayName || '名無しさん',
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL || defaultUserIcon,
      phoneNumber: user.phoneNumber,
      providerData: {
        providerId: user.providerData.length === 0 ? 'password' : user.providerData[0].providerId,
        uid: user.providerData.length === 0 ? user.email : user.providerData[0].uid
      },
      disabled: user.disabled
    });

    console.log(`Save User info! Document written at: ${result.writeTime.toDate()}`);
  } catch (error) {
    console.log(error);
  }
});