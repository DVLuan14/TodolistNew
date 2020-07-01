import ENDPOINT from '@/config/endpoint';
import { headers } from '@/lib/common';
import axios from 'axios';

function getAll(params) {
  return axios({
    methods: 'GET',
    url: ENDPOINT.TODOS,
    headers: headers(),
    params,
  });
}

function getItemsTodos(todoId) {
  return axios({
    method: 'GET',
    url: `${ENDPOINT.TODOS}/${todoId}/items`,
    headers: headers(),
  });
}

function createTodos(params) {
  return axios({
    methods: 'POST',
    url: ENDPOINT.TODOS,
    headers: headers(),
    params,
  });
}

function editTodos(params) {
  return axios({
    methods: 'PUT',
    url: ENDPOINT.TODOS,
    headers: headers(),
    params,
  });
}

function deleteTodos(params) {
  return axios({
    methods: 'DELETE',
    url: ENDPOINT.TODOS,
    headers: headers(),
    params,
  });
}

export default {
  getAll,
  getItemsTodos,
  createTodos,
  editTodos,
  deleteTodos,
};
