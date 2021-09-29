import axios from 'axios';
const API_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : 'http://localhost:5000';

const config = {
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// Users Calls

const PushNewUser = function (data) {
  return axios.post(API_URL + '/api/user/data', data, config).then((response) => {
    return response.data;
  });
};

const getUserById = function (id) {
  return axios.get(API_URL + '/api/user/data/' + id, config).then((response) => {
    return response.data;
  });
};

const getAllUsers = function (filterValue, limit, skip) {
  // ?limit=${limit}&skip=${skip}`
  console.log("addsd")
  return axios
    .get(API_URL + `/api/user/datas`, filterValue, config)
    .then((response) => {
      return response.data;
    });
};

const updateUserById = function (data) {
  return axios.put(API_URL + '/api/user/data', data, config).then((response) => {
    return response.data;
  });
};

const deleteUserById = function (id) {
  return axios.delete(API_URL + '/api/leads/data/' + id, config).then((response) => {
    return response.data;
  });
};

const deleteAllUser = function () {
  return axios
    .delete(API_URL + `/api/user/datas`, config)
    .then((response) => {
      return response.data;
    });
};


export default {
  PushNewUser, getUserById, getAllUsers, updateUserById, deleteUserById, deleteAllUser
};
