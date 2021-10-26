// Auth Service
import axios from "axios";

const register = async (formData) => {
  try {
    return await axios.post("/api/users/register", formData);
  } catch (err) {
    console.log("[CLIENT] Service-Error: Auth#register", err);
    throw err;
  }
};

// TODO: Get rid of "setCurrentUserData"
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

const currentUser = () => {
  return JSON.parse(localStorage.getItem("current-user"));
};

const authService = {
  register,
  login,
  logout,
  currentUser,
};

export default authService;
