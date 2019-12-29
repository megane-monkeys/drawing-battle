import { combineReducers } from "redux";
import timerReducer from "./timer/slice";

export interface RootState {
    timer: ReturnType<typeof timerReducer>;
}

const rootReducer = combineReducers({
    timer: timerReducer
});

export default rootReducer;
