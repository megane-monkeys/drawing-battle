import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startTime: new Date().getTime(),
    milliseconds: 0
};

const slice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        restartTimer: (state, action) => {
            state.startTime = new Date().getTime();
            state.milliseconds = 0;
        },
        stopTimer: (state, action) => {
            state.milliseconds = new Date().getTime() - state.startTime;
        },
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
