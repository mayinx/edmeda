// Auth Service
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = "http://localhost:8080/api/auth/";
// "/api/users/validateToken";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (formData, setCurrentUserData) => {
  try {
    const response = await axios.post("/api/users/login", formData);

    if (response.data && response.data.token) {
      // TODO: Decide: Are we going to storeuser data in memory and only the jwt in localStorage - or everything in localStorage?
      setCurrentUserData({
        token: response.data.token,
        user: response.data.user,
      });
      // TODO: Remove first - stick with second only - only one auth source of data
      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem("current-user", JSON.stringify(response.data));
    }
    return response;
  } catch (err) {
    console.log("[CLIENT] Service-Error: Auth#login", err);
    throw err;
  }
};

const logout = () => {
  localStorage.removeItem("current-user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("current-user"));
};

// export default {
//   register,
//   login,
//   logout,
//   getCurrentUser,
// };

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
