export const SERVER_ROOT = 'http://localhost:8000';
const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
  signin: () => `${API_ROOT}/user/create-session`,
  signup: () => `${API_ROOT}/user/create-user`,
  fetchProperty: (query) => `${API_ROOT}/search/?${query}`,
  toggleFavourite: (id) => `${API_ROOT}/user/toggle-fav/${id}`,
  updateProfile: (id) => `${API_ROOT}/user/update/${id}`,
};
