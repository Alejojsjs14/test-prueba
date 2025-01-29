import axios from "axios";
import { BASE_URL } from './utils/env.config.js'  

export async function fetchUser(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
}
