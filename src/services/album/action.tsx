import {
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_FAILURE,
  FETCH_ALBUM_SUCCESS,
  CREATE_ALBUM_REQUEST,
  CREATE_ALBUM_SUCCESS,
  CREATE_ALBUM_FAILURE,
  UPDATE_ALBUM_REQUEST,
  UPDATE_ALBUM_SUCCESS,
  UPDATE_ALBUM_FAILURE,
  DELETE_ALBUM_REQUEST,
  DELETE_ALBUM_SUCCESS,
  DELETE_ALBUM_FAILURE,
} from "./actionTypes";
import {
  FetchAlbumSuccessPayload,
  FetchAlbumFailurePayload,
  IAlbum,
  CreateAlbumFailure,
  CreateAlbumSuccess,
  FetchAlbumRequest,
} from "./types";

export const fetchAlbumRequest = (payload: FetchAlbumRequest['payload'] = {orderBy: 'asc'}) => ({
  type: FETCH_ALBUM_REQUEST,
  payload,
});

export const fetchAlbumSuccess = (payload: FetchAlbumSuccessPayload) => ({
  type: FETCH_ALBUM_SUCCESS,
  payload,
});

export const fetchAlbumFailure = (payload: FetchAlbumFailurePayload) => ({
  type: FETCH_ALBUM_FAILURE,
  payload,
});

export const createAlbumRequest = (payload: IAlbum, callback: () => void) => ({
  type: CREATE_ALBUM_REQUEST,
  payload,
  callback,
});

export const createAlbumSuccess = (payload: CreateAlbumSuccess['payload']) => ({
  type: CREATE_ALBUM_SUCCESS,
  payload,
});

export const createAlbumFailure = (payload: CreateAlbumFailure['payload']) => ({
  type: CREATE_ALBUM_FAILURE,
  payload,
});

export const updateAlbumRequest = (payload: IAlbum, callback: () => void) => ({
  type: UPDATE_ALBUM_REQUEST,
  payload,
  callback,
});

export const updateAlbumSuccess = (payload: CreateAlbumSuccess['payload']) => ({
  type: UPDATE_ALBUM_SUCCESS,
  payload,
});

export const updateAlbumFailure = (payload: CreateAlbumFailure['payload']) => ({
  type: UPDATE_ALBUM_FAILURE,
  payload,
});

export const deleteAlbumRequest = (payload: IAlbum, callback: () => void) => ({
  type: DELETE_ALBUM_REQUEST,
  payload,
  callback,
});

export const deleteAlbumSuccess = (payload: CreateAlbumSuccess['payload']) => ({
  type: DELETE_ALBUM_SUCCESS,
  payload,
});

export const deleteAlbumFailure = (payload: CreateAlbumFailure['payload']) => ({
  type: DELETE_ALBUM_FAILURE,
  payload,
});