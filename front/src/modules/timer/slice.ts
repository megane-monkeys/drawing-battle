import { createSlice } from "@reduxjs/toolkit";
import { TimerStatus } from "../../constants/timerStatus"

const initialState = {
    state: TimerStatus.STOP,
    startTime: new Date().getTime(),
    milliseconds: 0
};

const slice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: (state, action) => {
            state.startTime = new Date().getTime();
            state.state = TimerStatus.WORKING;
        },
        resetTimer: (state, action) => {
            state.state = TimerStatus.STOP;
            state.milliseconds = 0;
        },
        stopTimer: (state, action) => {
            state.state = TimerStatus.STOP;
        },
        updateTimer: (state, action) => {
            state.milliseconds = new Date().getTime() - state.startTime;
        }
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
