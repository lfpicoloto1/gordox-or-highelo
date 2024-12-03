import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Bem-vindo ao Gordox ou High Elo!</h1>
    <p>Assista ao vídeo e tente adivinhar: é o Gordox ou um High Elo?</p>
    <Link to="/game">Começar</Link>
  </div>
);

export default Home;
