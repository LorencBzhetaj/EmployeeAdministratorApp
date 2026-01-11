const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

export const API_ENDPOINTS = {
  BASE_URL: baseUrl,
  AUTH: {
    LOGIN: `${baseUrl}/api/auth/login`,
    CREATE_USER: `${baseUrl}/api/Auth/create-user`,
    GET_USERS: `${baseUrl}/api/Auth/get-users`,
    GET_USER_PROFILE: (userId) => `${baseUrl}/api/auth/get-user-profile/${userId}`,
    EDIT_USER: `${baseUrl}/api/Auth/edit-user`,
    DELETE_USER: (userId) => `${baseUrl}/api/Auth/delete-user/${userId}`,
    GET_USER_PHOTO: (userId) => `${baseUrl}/api/auth/users/${userId}/photo`,
  },
  PROJECT: {
    CREATE: `${baseUrl}/api/project/create-project`,
    GET_ALL: `${baseUrl}/api/project/get-projects`,
    EDIT: `${baseUrl}/api/project/edit-project`,
    DELETE: (projectId) => `${baseUrl}/api/project/delete-project/${projectId}`,
  },
  TASK: {
    CREATE: `${baseUrl}/api/task/create-task`,
    GET_ALL: `${baseUrl}/api/task/get-tasks`,
    EDIT: `${baseUrl}/api/Task/edit-task`,
  },
};

export default API_ENDPOINTS;



