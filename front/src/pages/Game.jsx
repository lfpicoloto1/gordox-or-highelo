import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { getVideos, postResponse, getResponses } from "../api";
import "../css/Game.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Game = () => {
  const [video, setVideo] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackColor, setFeedbackColor] = useState(""); // Nova variável para cor da mensagem
  const [choiceMessage, setChoiceMessage] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [chartData, setChartData] = useState(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    getVideos()
      .then((videos) => {
        if (videos.length > 0) {
          const latestVideo = videos[videos.length - 1];
          setVideo(latestVideo);

          fetchPlayerCount(latestVideo.id);
          fetchChartData(latestVideo.id);

          const storedChoices = JSON.parse(localStorage.getItem("userChoices")) || {};
          if (storedChoices[latestVideo.id]) {
            setUserChoice(storedChoices[latestVideo.id]);
            generateFeedback(latestVideo.is_gordox, storedChoices[latestVideo.id]);
          }
        }
      })
      .catch(console.error);
  }, []);

  const fetchPlayerCount = (videoId) => {
    getResponses()
      .then((responses) => {
        const count = responses.filter((response) => response.video_id === videoId).length;
        setPlayerCount(count);
      })
      .catch((error) => console.error("Erro ao buscar contador:", error));
  };

  const fetchChartData = (videoId) => {
    getResponses()
      .then((responses) => {
        const filteredResponses = responses.filter((response) => response.video_id === videoId);
        const gordoxCount = filteredResponses.filter((response) => response.choice === "Gordox").length;
        const highEloCount = filteredResponses.filter((response) => response.choice === "High Elo").length;

        setChartData({
          labels: ["Gordox", "High Elo"],
          datasets: [
            {
              data: [gordoxCount, highEloCount],
              backgroundColor: ["#50a302", "#4682b4"],
            },
          ],
        });
      })
      .catch((error) => console.error("Erro ao buscar dados do gráfico:", error));
  };

  const handleChoice = (choice) => {
    if (!video) return;

    setUserChoice(choice);

    const storedChoices = JSON.parse(localStorage.getItem("userChoices")) || {};
    storedChoices[video.id] = choice;
    localStorage.setItem("userChoices", JSON.stringify(storedChoices));

    generateFeedback(video.is_gordox, choice);

    postResponse({ video_id: video.id, choice })
      .then(() => {
        fetchPlayerCount(video.id);
        fetchChartData(video.id);
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
      })
      .catch(() => alert("Erro ao registrar a escolha."));
  };

  const generateFeedback = (isGordox, choice) => {
    let feedback = "";
    let color = ""; // Cor associada à mensagem
    let choiceText = `Você escolheu: ${choice}`;
    let audio = "";

    if (isGordox && choice === "Gordox") {
      feedback = "PARABÉNS MEU CUZAS, isso é uma autêntica jogada do Gordox!";
      color = "#50a302";
      audio = "/audio/gordox-play.mp3";
    } else if (!isGordox && choice === "Gordox") {
      feedback = "Ai meu cuzas, isso não foi Gordox, foi High Elo.";
      color = "#ff4500";
      audio = "/audio/derrota.mp3";
    } else if (isGordox && choice === "High Elo") {
      feedback = "Meu cuzas, errou rude, NT, isso foi UMA AUTÊNTICA GORDOX PLAY.";
      color = "#ff4500";
      audio = "/audio/rude-error.mp3";
    } else if (!isGordox && choice === "High Elo") {
      feedback = "Infelizmente você tá certo meu cuzas, isso foi High Elo.";
      color = "#50a302";
      audio = "/audio/high-elo.mp3";
    }

    setFeedbackMessage(feedback);
    setFeedbackColor(color);
    setChoiceMessage(choiceText);
    setAudioFile(audio);
  };

  const playAudio = () => {
    if (!audioFile) return;
    const audio = new Audio(audioFile);
    audio.play().catch((error) => {
      console.warn("Áudio não pôde ser reproduzido:", error.message);
    });
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=E%20ai%20meu%20cuzas,%20isso%20%C3%A9%20uma%20jogada%20Gordox%20ou%20High%20Elo https://gordoxouhighelo.com.br/?`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=E%20ai%20meu%20cuzas,%20isso%20%C3%A9%20uma%20jogada%20Gordox%20ou%20High%20Elo https://gordoxouhighelo.com.br/?`;
    window.open(url, "_blank");
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

      <div className="player-count-container">
        <p className="player-count">
          {playerCount} pessoa{playerCount > 1 ? "s" : ""} já jogaram!
        </p>
      </div>

      <h2 className="game-subtitle">É muito simples, vc assiste a play e decide se é uma jogada Gordox ou High Elo</h2>
      <div className="video-container">
        <iframe
          src={video.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="button-container">
        {userChoice ? (
          <div ref={feedbackRef} className="feedback-container">
            <p
              className="feedback-message"
              style={{ color: feedbackColor }}
            ><b>
              {feedbackMessage}
              </b>
            </p>
            <p className="choice-message">{choiceMessage}</p>
            <img
              src="/images/cliqueaqui.gif"
              alt="Reproduzir Áudio"
              className="audio-icon"
              onClick={playAudio}
            />
            {chartData && (
              <div className="chart-wrapper">
                <div className="chart-container">
                  <h3>Resultados:</h3>
                  <Pie data={chartData} />
                </div>
              </div>
            )}
            <div className="share-buttons">
              <button onClick={shareOnWhatsApp}>Compartilhar no WhatsApp</button>
              <button onClick={shareOnTwitter}>Compartilhar no Twitter</button>
            </div>
          </div>
        ) : (
          <>
            <button
              className="choice-button gordox-button"
              onClick={() => handleChoice("Gordox")}
            >
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
