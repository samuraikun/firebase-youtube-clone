/*
* Triggers when a user upload video file, video is transcoded mp4.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'transcodeVideo') {
  exports.transcodeVideo = require('./transcodeVideo').transcodeVideo;
}

/*
* Triggers when was created new user, user account is saved Firestore.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'saveUser') {
  exports.saveUser = require('./saveUser').saveUser;
}