import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { getVideos, postResponse } from "../api";
import "../css/Game.css"; // Importar o CSS

const Game = () => {
  const [video, setVideo] = useState(null);
  const [userChoice, setUserChoice] = useState(null); // Armazena a escolha do usuário
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Mensagem de feedback
  const [audioFile, setAudioFile] = useState(""); // Caminho do áudio

  useEffect(() => {
    // Busca o vídeo mais recente
    getVideos()
      .then((videos) => {
        if (videos.length > 0) {
          const latestVideo = videos[videos.length - 1];
          setVideo(latestVideo);

          // Verifica se o usuário já fez uma escolha para este vídeo
          const storedChoices = JSON.parse(localStorage.getItem("userChoices")) || {};
          if (storedChoices[latestVideo.id]) {
            setUserChoice(storedChoices[latestVideo.id]);
            generateFeedback(latestVideo.is_gordox, storedChoices[latestVideo.id]);
          }
        }
      })
      .catch(console.error);
  }, []);

  const handleChoice = (choice) => {
    if (!video) return;

    // Salva a escolha no estado
    setUserChoice(choice);

    // Salva a escolha no Local Storage
    const storedChoices = JSON.parse(localStorage.getItem("userChoices")) || {};
    storedChoices[video.id] = choice;
    localStorage.setItem("userChoices", JSON.stringify(storedChoices));

    // Gera a mensagem de feedback
    generateFeedback(video.is_gordox, choice);

    // Envia a escolha para o back-end
    postResponse({ video_id: video.id, choice })
      .then(() => console.log(`Escolha enviada: ${choice}`))
      .catch(() => alert("Erro ao registrar a escolha."));
  };

  const generateFeedback = (isGordox, choice) => {
    let message = "";
    let audio = "";

    if (isGordox && choice === "Gordox") {
      message = "PARABÉNS MEU CUZAS, isso é uma autêntica jogada do Gordox!";
      audio = "/audio/gordox-play.mp3";
    } else if (!isGordox && choice === "Gordox") {
      message = "Ai meu cuzas, isso não foi Gordox, foi High Elo.";
      audio = "/audio/derrota.mp3";
    } else if (isGordox && choice === "High Elo") {
      message = "Meu cuzas, errou rude, NT, isso foi UMA AUTÊNTICA GORDOX PLAY.";
      audio = "/audio/rude-error.mp3";
    } else if (!isGordox && choice === "High Elo") {
      message = "Infelizmente você tá certo meu cuzas, isso foi High Elo.";
      audio = "/audio/high-elo.mp3";
    }

    setFeedbackMessage(  <>
      {message}
      <br />
      <br />
      Você escolheu: {choice}.
    </>);
    setAudioFile(audio); // Define o arquivo de áudio apropriado
  };

  const playAudio = () => {
    if (!audioFile) return;
    const audio = new Audio(audioFile);
    audio.play().catch((error) => {
      console.warn("Áudio não pôde ser reproduzido:", error.message);
    });
  };

  if (!video) return <p>Carregando vídeo...</p>;

  return (
    <div className="game-container">
      <div className="title-container">
        <h1 className="game-title">Gordox ou High Elo?</h1>
        <img
          src="/images/gordox-oculos.jpg"
          alt="Ícone do Gordox"
          className="title-image"
        />
      </div>

      <h2 className="game-subtitle">Escolhe ai meu cuzassss</h2>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src={video.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="button-container">
        {userChoice ? (
          <>
            <p className="feedback-message">{feedbackMessage}</p>
            <img
              src="/images/cliqueaqui.gif" // Substitua pelo caminho da sua imagem
              alt="Reproduzir Áudio"
              className="audio-icon"
              onClick={playAudio}
            />
          </>
        ) : (
          <>
            <button
              className="choice-button gordox-button"
              onClick={() => handleChoice("Gordox")}
            >
              <img
                src="/images/emumu.png"
                alt="Amumu"
                className="icon"
              />
              Gordox
            </button>
            <button
              className="choice-button high-elo-button"
              onClick={() => handleChoice("High Elo")}
            >
              High Elo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
