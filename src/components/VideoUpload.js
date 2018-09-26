import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
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
      const fileSnapshot = await videoStorageRef.put(video);

      // mp4以外の動画は、Cloud Functions上で、トランスコードした後に
      // メタデータを Firestore に保存する
      if (video.type === 'video/mp4') {
        const downloadURL = await videoStorageRef.getDownloadURL();
        let metadata = _.omitBy(fileSnapshot.metadata, _.isEmpty);
        metadata = Object.assign(metadata, {downloadURL: downloadURL});

        this.saveVideoMetadata(metadata);
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

  saveVideoMetadata(metadata) {
    const collection = firebase.firestore().collection('videos');
    return collection.add(metadata);
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