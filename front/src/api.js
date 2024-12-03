import axios from "axios";

const API_URL = "http://localhost:8000";

export const getVideos = async () => {
  const response = await axios.get(`${API_URL}/videos/`);
  return response.data;
};

export const postResponse = async (response) => {
  const result = await axios.post(`${API_URL}/responses/`, response);
  return result.data;
};
