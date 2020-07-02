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

function createTodo(params) {
  return axios({
    method: 'POST',
    url: ENDPOINT.TODOS,
    headers: headers(),
    params,
  });
}

function updateTodo(id, data) {
  return axios({
    method: 'PUT',
    url: `${ENDPOINT.TODOS}/${id}`,
    headers: headers(),
    data,
  });
}

function deleteTodos(id) {
  return axios({
    method: 'DELETE',
    url: `${ENDPOINT.TODOS}/${id}`,
    headers: headers(),
  });
}

function getItemsTodos(todoId) {
  return axios({
    methods: 'GET',
    url: `${ENDPOINT.TODOS}/${todoId}/items`,
    headers: headers(),
  });
}

function createItem(todoId, data) {
  return axios({
    method: 'POST',
    url: `${ENDPOINT.TODOS}/${todoId}/items`,
    headers: headers(),
    data,
  });
}

function updateItem(todoId, id, data) {
  return axios({
    method: 'PUT',
    url: `${ENDPOINT.TODOS}/${todoId}/items/${id}`,
    headers: headers(),
    data,
  });
}

function deleteItem(todoId, id) {
  return axios({
    method: 'DELETE',
    url: `${ENDPOINT.TODOS}/${todoId}/items/${id}`,
    headers: headers(),
  });
}
export default {
  getAll,
  createTodo,
  updateTodo,
  deleteTodos,
  getItemsTodos,
  createItem,
  updateItem,
  deleteItem,
};
