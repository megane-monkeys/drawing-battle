import { createSlice } from "@reduxjs/toolkit";
import { AppStatus } from "../../constants/appStatus"

const initialState = {
    state: AppStatus.READY,
};

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        abort: (state, action) => {
            state.state = AppStatus.ABORT;
        },
        start: (state, action) => {
            state.state = AppStatus.DRAWING;
        },
        success: (state, action) => {
            state.state = AppStatus.SUCCESS;
        },
        ready: (state, action) => {
            state.state = AppStatus.READY;
        },
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
