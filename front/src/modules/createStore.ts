import rootReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { rootSagas } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];
const store = configureStore( {
    reducer: rootReducer,
    middleware,
});
export default store;
sagaMiddleware.run(rootSagas);
