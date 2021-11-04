import { createSelector } from "reselect";

import { AppState } from "src/reducers";

const getLoading = (state: AppState) => state.albumState.loading;

const getAlbums = (state: AppState) => state.albumState.albums;

const getError = (state: AppState) => state.albumState.error;

export const getLoadingSelector = createSelector(getLoading, (albums) => albums);

export const getAlbumsSelector = createSelector(getAlbums, (albums) => albums);

export const getErrorSelector = createSelector(getError, (error) => error);