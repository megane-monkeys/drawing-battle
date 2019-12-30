import { all } from "redux-saga/effects";
import { predictionSagas } from "./prediction";
export function* rootSagas() {
    yield all([...predictionSagas()]);
}
