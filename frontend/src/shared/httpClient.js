import { getToken } from '../services/auth.service';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const getOptions = () => ({
  headers: getHeaders(),
});
const postOptions = body => ({
  headers: getHeaders(),
  method: 'POST',
  body: JSON.stringify(body),
});
const putOptions = body => ({
  headers: getHeaders(),
  method: 'PUT',
  body: JSON.stringify(body),
});
const deleteOptions = () => ({
  headers: getHeaders(),
  method: 'DELETE',
});

const handleResponse = response => {
  if (response.status >= 400) {
    throw response.json();
  }
  return response.json();
};

export const get = async path =>
  await fetch(path, getOptions()).then(handleResponse);
export const post = async (path, body) =>
  await fetch(path, postOptions(body)).then(handleResponse);
export const put = async (path, body) =>
  await fetch(path, putOptions(body)).then(handleResponse);
export const destroy = async path =>
  await fetch(path, deleteOptions()).then(handleResponse);
