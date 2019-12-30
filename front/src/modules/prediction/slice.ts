import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    result: ""
};

const slice = createSlice({
    name: "prediciton",
    initialState,
    reducers: {
        initialize: (state, action) => {
            state.result = "";
        },
        setResult: (state, action) => {
            state.result = action.payload;
        }
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
