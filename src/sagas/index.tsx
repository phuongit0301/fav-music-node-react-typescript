import { all, fork } from "redux-saga/effects";

import albumWatcher from "src/services/album/sagas";

export default function* rootSaga() {
    yield all([
        fork(albumWatcher)
    ]);
}