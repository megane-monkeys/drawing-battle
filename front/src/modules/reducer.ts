import { combineReducers } from "redux";
import timerReducer from "./timer/slice";
import predictionReducer from "./prediction/slice";

export interface RootState {
    timer: ReturnType<typeof timerReducer>;
    prediction: ReturnType<typeof predictionReducer>;
}

const rootReducer = combineReducers({
    timer: timerReducer,
    prediction: predictionReducer
});

export default rootReducer;
