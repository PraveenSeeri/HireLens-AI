import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ===============================
// Automatically Attach JWT Token
// ===============================

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===============================
// Register User
// ===============================

export async function registerUser(userData) {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
}

// ===============================
// Login User (OAuth2 Password Flow)
// ===============================

export async function loginUser(userData) {
  const formData = new URLSearchParams();

  // OAuth2 expects "username"
  // We send the user's email here.
  formData.append("username", userData.email);
  formData.append("password", userData.password);

  const response = await API.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

export default API;