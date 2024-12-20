import axios from "axios";

const API_URL = "https://api.gordoxouhighelo.com.br"

console.log(API_URL)

// Instância do Axios com configuração padrão
const apiClient = axios.create({
  baseURL: API_URL,
});

// Função para buscar vídeos
export const getVideos = async () => {
  console.log(API_URL)
  console.log("Chamou get")
  const response = await apiClient.get("/videos/");
  return response.data;
};

// Função para enviar resposta
export const postResponse = async (response) => {
  const result = await apiClient.post("/responses/", response);
  return result.data;
};

export const getResponses = async () => {
  console.log(API_URL)
  console.log("Chamou get")
  const response = await apiClient.get("/responses/");
  return response.data;
};