import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from '../config/firebase';
import 'firebase/firestore';
import VideoPlayer from './VideoPlayer';

const styles = theme => ({
  root: {
    padding: "50px",
  },
});

class VideoFeed extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [] }
  }

  async componentWillMount() {
    const datas = [];
    const collection = await firebase.firestore().collection('videos').limit(50);
    const querySnapshot = await collection.get();

    await querySnapshot.forEach(doc => {
      datas.push(doc.data());
    });

    this.setState({ videos: datas });
  }

  renderVideoPlayers(videos) {
    return videos.map(video => {
      return (
        <Grid key={video.name} item xs={6}>
          <VideoPlayer video={video} />
        </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.root}
        spacing={40}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {this.renderVideoPlayers(this.state.videos)}
      </Grid>
    );
  }
}

VideoFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoFeed);