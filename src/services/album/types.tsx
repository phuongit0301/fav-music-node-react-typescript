import {
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_FAILURE,
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

export interface IAlbum {
  id?: number;
  title: string;
  description: string;
  isBest: boolean;
}

export interface UserState {
  albums: IAlbum[];
  album: IAlbum | null;
  error: string | null;
  loading: boolean | false;
  callback?: () => void;
}

export interface FetchAlbumSuccessPayload {
  data: IAlbum[];
}

export interface FetchAlbumFailurePayload {
  error: string;
}

export interface FetchAlbumRequest {
  type: typeof FETCH_ALBUM_REQUEST;
  payload: {
    search?: string;
    orderBy?: string;
  }
}

export type FetchAlbumSuccess = {
  type: typeof FETCH_ALBUM_SUCCESS;
  payload: FetchAlbumSuccessPayload;
};

export type FetchAlbumFailure = {
  type: typeof FETCH_ALBUM_FAILURE;
  payload: FetchAlbumFailurePayload;
};

export interface CreateAlbumRequest {
  type: typeof CREATE_ALBUM_REQUEST;
  payload: IAlbum;
  callback?: () => void;
}

export type CreateAlbumSuccess = {
  type: typeof CREATE_ALBUM_SUCCESS;
  payload: {
    data: IAlbum;
    message: string;
    success: boolean;
  };
};

export type CreateAlbumFailure = {
  type: typeof CREATE_ALBUM_FAILURE;
  payload: {
    error: string,
  };
};

export interface UpdateAlbumRequest {
  type: typeof UPDATE_ALBUM_REQUEST;
  payload: IAlbum;
  callback?: () => void;
}

export type UpdateAlbumSuccess = {
  type: typeof UPDATE_ALBUM_SUCCESS;
  payload: {
    data: IAlbum;
    message: string;
    success: boolean;
  };
};

export type UpdateAlbumFailure = {
  type: typeof UPDATE_ALBUM_FAILURE;
  payload: {
    error: string,
  };
};

export interface DeleteAlbumRequest {
  type: typeof DELETE_ALBUM_REQUEST;
  payload: IAlbum;
  callback?: () => void;
}

export type DeleteAlbumSuccess = {
  type: typeof DELETE_ALBUM_SUCCESS;
  payload: {
    data: IAlbum;
    message: string;
    success: boolean;
  };
};

export type DeleteAlbumFailure = {
  type: typeof DELETE_ALBUM_FAILURE;
  payload: {
    error: string,
  };
};


export type AlbumActions =
  | FetchAlbumRequest
  | FetchAlbumSuccess
  | FetchAlbumFailure
  | CreateAlbumRequest
  | CreateAlbumSuccess
  | CreateAlbumFailure
  | UpdateAlbumRequest
  | UpdateAlbumSuccess
  | UpdateAlbumFailure
  | DeleteAlbumRequest
  | DeleteAlbumSuccess
  | DeleteAlbumFailure;