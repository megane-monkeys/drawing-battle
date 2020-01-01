import { combineReducers } from "redux";
import timerReducer from "./timer";
import predictionReducer from "./prediction";
import appReducer from "./app";

export interface RootState {
    app: ReturnType<typeof appReducer>;
    prediction: ReturnType<typeof predictionReducer>;
    timer: ReturnType<typeof timerReducer>;
}

const rootReducer = combineReducers({
    app: appReducer,
    prediction: predictionReducer,
    timer: timerReducer,
});

export default rootReducer;
