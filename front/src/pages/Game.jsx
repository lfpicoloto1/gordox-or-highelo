import React, { useState, useEffect } from "react";
import { getVideos, postResponse } from "../api";

const Game = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userChoices, setUserChoices] = useState(() => {
    return JSON.parse(localStorage.getItem("userChoices")) || {};
  });

  useEffect(() => {
    getVideos().then(setVideos).catch(console.error);
  }, []);

  const handleChoice = (choice) => {
    const video = videos[currentVideoIndex];
    const videoId = video.id;

    // Salva a escolha localmente
    const updatedChoices = { ...userChoices, [videoId]: choice };
    setUserChoices(updatedChoices);
    localStorage.setItem("userChoices", JSON.stringify(updatedChoices));

    // Envia a escolha para o backend
    postResponse({ video_id: videoId, choice }).catch(console.error);

    // Avança para o próximo vídeo
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prev) => prev + 1);
    } else {
      alert("Fim do jogo! Obrigado por participar.");
    }
  };

  if (!videos.length) return <p>Carregando vídeos...</p>;

  const currentVideo = videos[currentVideoIndex];
  return (
    <div>
      <h2>Jogo</h2>
      <video width="600" controls>
        <source src={currentVideo.url} type="video/mp4" />
      </video>
      <div>
        <button onClick={() => handleChoice("Gordox")}>Gordox</button>
        <button onClick={() => handleChoice("High Elo")}>High Elo</button>
      </div>
    </div>
  );
};

export default Game;
