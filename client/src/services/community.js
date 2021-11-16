// Current Community Data Service
//
// CREATE: create; addMember;
// RETRIEVE: getAll, get, getMembers, getMember;
// UPDATE: update, updateMember;
// DELETE: destroy, destroyAll, removeMember, destroyMember;
// FINDER: find, findMember;

import axios from "axios";
import AuthService from "./auth";

const get = async (id) => {
  try {
    return await axios.get(`/api/communities/${id}`, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#get: ", err);
    throw err;
  }
};

const getAll = async (id) => {
  try {
    return await axios.get(`/api/communities/`, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#getAll: ", err);
    throw err;
  }
};

const create = async (data) => {
  try {
    return await axios.post(`/api/communities`, data, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#create: ", err);
    throw err;
  }
};

const update = async (id, data) => {
  try {
    return await axios.patch(`/api/communities/${id}`, data, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#update: ", err);
    throw err;
  }
};

const destroy = async (id) => {
  try {
    return await axios.delete(`/api/communities/${id}`, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#destroy: ", err);
    throw err;
  }
};

// COMMUNITY MEMBER RELATED

const getMembers = async (id) => {
  try {
    return await axios.get(`/api/communities/${id}/members`, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#getMembers: ", err);
    throw err;
  }
};

const getMember = async (id, memberId) => {
  try {
    return await axios.get(`/api/communities/${id}/members/${memberId}`, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#getMember: ", err);
    throw err;
  }
};

const addMember = async (id, data) => {
  try {
    return await axios.post(`/api/communities/${id}/members`, data, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#updateMember: ", err);
    throw err;
  }
};

const updateMember = async (id, memberId, data) => {
  try {
    return await axios.patch(
      `/api/communities/${id}/members/${memberId}`,
      data,
      {
        headers: AuthService.authHeader(),
      }
    );
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#updateMember: ", err);
    throw err;
  }
};

const removeMember = async (id, memberId) => {
  try {
    return await axios.delete(`/api/communities/${id}/members/${memberId}`, {
      headers: AuthService.authHeader(),
    });
  } catch (err) {
    console.log("[CLIENT] Service-Error: Community#removeMember: ", err);
    throw err;
  }
};

const CommunityDataService = {
  get,
  getAll,
  create,
  update,
  destroy,
  getMembers,
  getMember,
  addMember,
  updateMember,
  removeMember,
};

export default CommunityDataService;
