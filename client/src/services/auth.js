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

const login = async (formData) => {
  try {
    const response = await axios.post("/api/users/login", formData);

    if (response.data && response.data.token && response.data.user) {
      localStorage.setItem("current-user", JSON.stringify(response.data));
    }
    return response;
  } catch (err) {
    console.log("[CLIENT] Service-Error: Auth#login", err);
    throw err;
  }
};
// TODO: Test!
// const validateAuthToken = async () => {
//   try {
//     const response = await axios.post("/api/users/validateToken", null, {
//       headers: AuthService.authHeader(),
//     });
//     if (response.data && response.data.validToken) {
//       setCurrentUser(response.data);
//     }
//   } catch (err) {
//     console.log("-- verifyAuthToken: ", err);
//   }
// };

const logout = () => {
  localStorage.removeItem("current-user");
};

const currentUser = () => {
  return JSON.parse(localStorage.getItem("current-user"));
};
const loggedIn = () => {
  const user = currentUser();
  return user && user.token && user.user ? true : false;
};

// authHeader Service
// Returns auth header with jwt if user is logged in -  used to create
// the necessary http-header part to issue requests for protected resources
const authHeader = () => {
  const user = currentUser();
  const isLoggedIn = user && user.token && user.user ? true : false;

  if (isLoggedIn) {
    return { "x-auth-token": user.token };
  } else {
    return {};
  }
};

const AuthService = {
  register,
  login,
  logout,
  currentUser,
  loggedIn,
  authHeader,
};

export default AuthService;
