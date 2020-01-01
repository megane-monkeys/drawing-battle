import { combineReducers } from "redux";
import timerReducer from "./timer/slice";
import predictionReducer from "./prediction/slice";
import appReducer from "./app/slice";

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
