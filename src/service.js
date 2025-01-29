import axios from "axios";
import { API_EXTERNA } from './utils/env.config.js'

// Realiza una peticion a una api externa
const fetchExternalData = async () => {
  const response = await axios.get(
    `${API_EXTERNA}/users`
  );
  return response.data;
};

export { fetchExternalData };
