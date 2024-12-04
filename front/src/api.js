import axios from "axios";

const API_URL = process.env.API_URL
const USERNAME = process.env.REACT_APP_API_USERNAME;
const PASSWORD = process.env.REACT_APP_API_PASSWORD;

// Instância do Axios com configuração padrão
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Authorization": `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`, // Autenticação básica
  },
});

// Função para buscar vídeos
export const getVideos = async () => {
  const response = await apiClient.get("/videos/");
  return response.data;
};

// Função para enviar resposta
export const postResponse = async (response) => {
  const result = await apiClient.post("/responses/", response);
  return result.data;
};
