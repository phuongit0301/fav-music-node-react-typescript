export const ROOT_URL = process.env.REACT_APP_API_URL + '/api';
export const API_GET_ALBUMS_URL = `${ROOT_URL}/albums`;
export const API_UPDATE_ALBUMS_URL = (id: number | undefined) => `${ROOT_URL}/albums/${id}`;