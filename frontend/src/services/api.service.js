import { get, post, put, destroy } from '../shared/httpClient';

const API = process.env.REACT_APP_API_URL;
const PROJECTS = `${API}/projects`;
const ISSUES = id => `${PROJECTS}/${id}/issues`;

// Projects

export const getProjects = async () =>
  await get(`${PROJECTS}`);
export const getProject = async id =>
  await get(`${PROJECTS}/${id}`);
export const addProject = async (body) =>
  await post(`${PROJECTS}`, body);
export const updateProject = async (id, body) =>
  await put(`${PROJECTS}/${id}`, body);
export const deleteProject = async id =>
  await destroy(`${PROJECTS}/${id}`);

// Issues

export const getIssues = async projectId =>
  await get(`${ISSUES(projectId)}`);
export const getIssue = async (projectId, id) =>
  await get(`${ISSUES(projectId)}/${id}`);
export const addIssue = async (projectId, body) =>
  await post(`${ISSUES(projectId)}`, body);
export const updateIssue = async (projectId, id, body) =>
  await put(`${ISSUES(projectId)}/${id}`, body);
export const deleteIssue = async (projectId, id) =>
  await destroy(`${ISSUES(projectId)}/${id}`);
  