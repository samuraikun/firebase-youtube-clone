import React from 'react';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

const VideoPlayer = props => {
  return (
    <Player fluid={false} width={620} height={500}>
      <source src={props.video.downloadURL} />
      <BigPlayButton position="center" />
    </Player>
  );
}

export default VideoPlayer;