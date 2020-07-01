import ENDPOINT from '@/config/endpoint';
import axios from 'axios';
import { headers } from '@/lib/common';

function login(user) {
  return axios({
    method: 'POST',
    url: ENDPOINT.SIGNIN,
    headers: {
      'Content-Type': 'application/json',
    },
    data: user,
  });
}

function register(user) {
  return axios({
    method: 'POST',
    url: ENDPOINT.SIGNUP,
    headers: headers(),
    data: user,
  });
}

export default {
  login,
  register,
};
