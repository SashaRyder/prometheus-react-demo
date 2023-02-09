import axiosBase from 'axios';

const { REACT_APP_API_BASE_URL, REACT_APP_API_KEY } = process.env;

export const axios = axiosBase.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: {
    Authorization: REACT_APP_API_KEY,
  },
});
