import { createSlice } from "@reduxjs/toolkit";

const STOP = 'STOP';
const INITIAL = 'INITIAL';
const WORKING = 'WORKING';

const initialState = {
    state: STOP,
    startTime: new Date(),
    time: 0
};

export default createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: (state, action) => {
            state.startTime = new Date();
            state.state = WORKING;
        },
        resetTimer: (state, action) => {
            state.state = INITIAL;
            state.time = 0;
        },
        stopTimer: (state, action) => {
            state.state = STOP;
        },
        updateTimer: (state, action) => {
            state.time = + new Date() - + state.startTime;
        }
    }
});
