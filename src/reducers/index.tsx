import { combineReducers } from "redux";

import albumReducer from "src/services/album/reducer";

const rootReducer = combineReducers({
  albumState: albumReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;