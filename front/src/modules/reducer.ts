import { combineReducers } from "redux";
import timerModule from "./timer/slice";

export interface RootState {
    timer: ReturnType<typeof timerModule.reducer>;
}

const rootReducer = combineReducers({
    timer: timerModule.reducer
});

export default rootReducer;
