import {
    FETCH_ALBUM_REQUEST,
    FETCH_ALBUM_SUCCESS,
    FETCH_ALBUM_FAILURE,
    CREATE_ALBUM_REQUEST,
    CREATE_ALBUM_SUCCESS,
    CREATE_ALBUM_FAILURE,
    UPDATE_ALBUM_REQUEST,
    UPDATE_ALBUM_FAILURE,
    UPDATE_ALBUM_SUCCESS,
    DELETE_ALBUM_REQUEST,
    DELETE_ALBUM_FAILURE,
    DELETE_ALBUM_SUCCESS,
  } from "./actionTypes";
  
  import { AlbumActions, IAlbum, UserState } from "./types";
  
  const initialState: UserState = {
    albums: [],
    album: null,
    error: null,
    loading: false,
    callback: () => {},
  };
  
  const userReducer =  (state = initialState, action: AlbumActions): UserState => {
    switch (action.type) {
      case FETCH_ALBUM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_ALBUM_REQUEST:
      case DELETE_ALBUM_REQUEST:
        return {
          ...state,
          ...action?.payload,
          callback: action?.callback,
          loading: true,
        }
      case UPDATE_ALBUM_REQUEST:
        return {
          ...state,
          ...action?.payload,
          callback: action?.callback,
        }
      case FETCH_ALBUM_SUCCESS:
        return {
          ...state,
          loading: false,
          albums: action.payload.data,
          error: null,
        };
      case CREATE_ALBUM_SUCCESS:
        return {
          ...state,
          albums: [...state.albums, action?.payload?.data],
          loading: false,
        }
      case UPDATE_ALBUM_SUCCESS:
        return {
          ...state,
          albums: [...state.albums.filter((item: IAlbum) => item?.id === action?.payload?.data?.id ? action?.payload?.data : item)],
        }
      case DELETE_ALBUM_SUCCESS:
        return {
          ...state,
          albums: [...state.albums.filter((item: IAlbum) => item?.id != action?.payload?.data?.id)],
        }
      case FETCH_ALBUM_FAILURE:
      case UPDATE_ALBUM_FAILURE:
      case CREATE_ALBUM_FAILURE:
      case DELETE_ALBUM_FAILURE:
        return {
          ...state,
          loading: false,
          albums: [],
          error: action.payload.error,
        };
      default:
        return {
          ...state,
        };
    }
  };

  export default userReducer;