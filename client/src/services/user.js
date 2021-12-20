// Current User Data Service
import axios from "axios";
import AuthService from "./auth";

const communities = async (userId) => {
  const requestUri = userId
    ? `/api/communities?userId=${userId}`
    : "/api/communities";
  try {
    return await axios.get(requestUri, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: User#communities: ", err);
    throw err;
  }
};

const tenantCommunity = async () => {
  try {
    return await axios.get("/api/communities/tenant", {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: User#tenantCommunity: ", err);
    throw err;
  }
};

const UserDataService = {
  communities,
  tenantCommunity,
};

export default UserDataService;
