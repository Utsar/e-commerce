import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjIwZGNmMmI2MzJkZDAzMGJkNjVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Njc4MDY0NSwiZXhwIjoxNjQ2Nzg0MjQ1fQ.FYDxruPY6vlo0llwyoKaWIqs0U4lBeIscHAMvbPssm0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
