import React from "react";

const VideoPlayer = ({ video, onChoose }) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={video.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onChoose("Gordox")}>Gordox</button>
        <button onClick={() => onChoose("High Elo")}>High Elo</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
