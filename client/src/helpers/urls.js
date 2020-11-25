const API_ROOT = 'http://localhost:8000/api/v1';

export const APIurls = {
  signin: () => `${API_ROOT}/user/create-session`,
  signup: () => `${API_ROOT}/user/create-user`,
  fetchProperty: (query) => `${API_ROOT}/search/?${query}`,
  fetchFavourites: () => `${API_ROOT}/user/favs`,
};
