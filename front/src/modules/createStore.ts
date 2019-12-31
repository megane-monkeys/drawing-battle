import rootReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { rootSagas } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    const middleware = [...getDefaultMiddleware(), sagaMiddleware, logger];
}
const store = configureStore( {
    reducer: rootReducer,
    middleware,
});
export default store;
sagaMiddleware.run(rootSagas);
