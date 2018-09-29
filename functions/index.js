/*
* Triggers when a user upload video file, video is transcoded mp4.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'transcodeVideo') {
  exports.transcodeVideo = require('./transcodeVideo').transcodeVideo;
}