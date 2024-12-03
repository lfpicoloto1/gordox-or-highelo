import React from "react";

const VideoPlayer = ({ video, onChoose }) => {
  return (
    <div>
      <video width="600" controls>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <button onClick={() => onChoose("Gordox")}>Gordox</button>
        <button onClick={() => onChoose("High Elo")}>High Elo</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
