import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import firebase from '../config/firebase';
import _ from 'lodash';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { video: null, loading: false }
  }

  handleChange = event => {
    event.preventDefault();
    const video = event.target.files[0];

    this.setState({ video });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });
    this.fileUpload(this.state.video);
  }

  async fileUpload(video) {
    try {
      const filePath = `videos/${firebase.auth().currentUser.uid}/${video.name}`;
      const videoStorageRef = firebase.storage().ref(filePath);
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      const metadataForStorage = {
        customMetadata: {
          idToken: idToken
        }
      }
      const fileSnapshot = await videoStorageRef.put(video, metadataForStorage);

      // mp4以外の動画は、Cloud Functions上で、トランスコードした後に
      // メタデータを Firestore に保存する
      if (video.type === 'video/mp4') {
        const downloadURL = await videoStorageRef.getDownloadURL();
        let metadataForFirestore = _.omitBy(fileSnapshot.metadata, _.isEmpty);
        metadataForFirestore = Object.assign(metadataForFirestore, {downloadURL: downloadURL});

        await this.saveVideoMetadata(metadataForFirestore);
      }

      if (fileSnapshot.state === 'success') {
        console.log(fileSnapshot);

        this.setState({ video: null, loading: false });
      } else {
        console.log(fileSnapshot);

        this.setState({ video: null, loading: false });
        alert('ファイルのアップロードに失敗しました！');
      }
    } catch(error) {
      console.log(error);

      return;
    }
  }

  async saveVideoMetadata(metadata) {
    const user_id = firebase.auth().currentUser.uid;
    const videoRef = firebase.firestore().doc(`users/${user_id}`).collection('videos').doc();
    metadata = Object.assign(metadata, { uid: videoRef.id });

    await videoRef.set(metadata, { merge: true });
  }

  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text='Loading your content...'
      >
        <form onSubmit={e => this.handleSubmit(e)}>
          <h2>Video Upload</h2>
          <input
            type="file"
            accept="video/*"
            onChange={e => this.handleChange(e)}
          />
          <button type="submit">Upload Video</button>
        </form>
      </LoadingOverlay>
    );
  }
}

export default Upload;