import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from './VideoPlayer';

const styles = theme => ({
  root: {
    padding: "50px",
  },
});

class VideoFeed extends Component {
  componentDidMount() {
    this.props.fetchVideos();
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
    const { classes, videos } = this.props;

    return (
      <Grid
        container
        className={classes.root}
        spacing={40}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {this.renderVideoPlayers(videos)}
      </Grid>
    );
  }
}

VideoFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoFeed);