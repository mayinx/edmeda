// authHeader Service
// Returns auth header with jwt if user is logged in -  used to create
// the necessary http-header part to issue requests for protected resources
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("current-user"));
  const isLoggedIn = user && user.token;

  if (isLoggedIn) {
    return { "x-auth-token": user.token };
  } else {
    return {};
  }
}
