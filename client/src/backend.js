import axios from "axios";

const BASE_URL = "https://utsar-e-commerce.herokuapp.com/";
const TOKEN = process.env.BACKENDTOKEN;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
