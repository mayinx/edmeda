// Current User Data Service
import axios from "axios";
import AuthService from "./auth";

const communities = async () => {
  try {
    return await axios.get("/api/communities", {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: User#communities: ", err);
    throw err;
  }
};

const UserDataService = {
  communities,
};

export default UserDataService;
