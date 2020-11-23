const API_ROOT = 'http://localhost:8000/api/v1';

export const APIurls = {
  signin: () => `${API_ROOT}/user/create-session`,
  signup: () => `${API_ROOT}/user/create-user`,
  fetchProperty: (page, limit) => `${API_ROOT}/search/`,
};
// type=Sale&location=Delhi
// `${API_ROOT}/search?page=${page}&limit=${limit}`,
