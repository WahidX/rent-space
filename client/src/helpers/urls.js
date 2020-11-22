const API_ROOT = 'http://localhost:8000';

export const APIurls = {
  signin: () => `${API_ROOT}/signin`,
  signup: () => `${API_ROOT}/signup`,
  fetchProperty: (page, limit) => `${API_ROOT}?page=${page}&limit=${limit}`,
};
