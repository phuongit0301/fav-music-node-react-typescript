import axios, { AxiosError } from "axios";
import { all, call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";

import { createAlbumSuccess, createAlbumFailure, fetchAlbumFailure, fetchAlbumSuccess, updateAlbumSuccess, updateAlbumFailure, deleteAlbumSuccess, deleteAlbumFailure } from "./action";
import { CREATE_ALBUM_REQUEST, DELETE_ALBUM_REQUEST, FETCH_ALBUM_REQUEST, UPDATE_ALBUM_REQUEST } from "./actionTypes";
import { CreateAlbumRequest, CreateAlbumSuccess, DeleteAlbumRequest, DeleteAlbumSuccess, FetchAlbumRequest, FetchAlbumSuccess, UpdateAlbumRequest, UpdateAlbumSuccess } from "./types";
import AlbumAPI from "./apis";

type ServerError = { errorMessage: string };

function* sagaGetAlbum(payload: FetchAlbumRequest) {
  try {
    yield delay(500);
    const response: FetchAlbumSuccess['payload'] = yield call(AlbumAPI.findAll, payload?.payload);
    yield put(fetchAlbumSuccess(response));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        yield put(
          fetchAlbumFailure({
            error: serverError.response.data.errorMessage,
          })
        );
      }
    } else {
      yield put(
        fetchAlbumFailure({
          error: 'Error fetch album',
        })
      );
    }
  }
}

function* sagaCreateAlbum(payload: CreateAlbumRequest) {
  try {
    const response: CreateAlbumSuccess['payload'] = yield call(AlbumAPI.create, payload?.payload);
    yield put(createAlbumSuccess(response));
    payload?.callback && payload?.callback();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        yield put(
          createAlbumFailure({
            error: serverError.response.data.errorMessage,
          })
        );
      }
    } else {
      yield put(
        createAlbumFailure({
          error: 'Error create album',
        })
      );
    }
  }
}

function* sagaUpdateAlbum(payload: UpdateAlbumRequest) {
  try {
    const response: UpdateAlbumSuccess['payload'] = yield call(AlbumAPI.update, payload?.payload);
    yield put(updateAlbumSuccess(response));
    payload?.callback && payload?.callback();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        yield put(
          updateAlbumFailure({
            error: serverError.response.data.errorMessage,
          })
        );
      }
    } else {
      yield put(
        updateAlbumFailure({
          error: 'Error update album',
        })
      );
    }
  }
}

function* sagaDeleteAlbum(payload: DeleteAlbumRequest) {
  try {
    const response: DeleteAlbumSuccess['payload'] = yield call(AlbumAPI.delete, payload?.payload);
    yield put(deleteAlbumSuccess(response));
    payload?.callback && payload?.callback();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        yield put(
          deleteAlbumFailure({
            error: serverError.response.data.errorMessage,
          })
        );
      }
    } else {
      yield put(
        deleteAlbumFailure({
          error: 'Error update album',
        })
      );
    }
  }
}

function* watchGetAlbum() {
  yield takeLatest(FETCH_ALBUM_REQUEST, sagaGetAlbum)
}

function* watchCreateAlbum() {
  yield takeEvery(CREATE_ALBUM_REQUEST, sagaCreateAlbum)
}

function* watchUpdateAlbum() {
  yield takeEvery(UPDATE_ALBUM_REQUEST, sagaUpdateAlbum)
}

function* watchDeleteAlbum() {
  yield takeEvery(DELETE_ALBUM_REQUEST, sagaDeleteAlbum)
}


function* albumWatcher() {
  yield all([watchGetAlbum(), watchCreateAlbum(), watchUpdateAlbum(), watchDeleteAlbum()]);
}

export default albumWatcher;