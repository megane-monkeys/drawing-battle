import { createSlice } from "@reduxjs/toolkit";
import { PredictionStatus } from "../../constants/predictionStatus"

const initialState = {
    answer: "",
    prediction: "-",
    status: PredictionStatus.INITIAL
};

const slice = createSlice({
    name: "prediciton",
    initialState,
    reducers: {
        initialize: (state, action) => {
            state.status = PredictionStatus.INITIAL;
            state.answer = "";
            state.prediction = "-";
        },
        setAnswer: (state, action) => {
            state.answer = action.payload;
            state.status = PredictionStatus.PREDICTION;
        },
        setPrediction: (state, action: { payload: any; type: string } & {}) => {
            state.prediction = action.payload;
            state.status = PredictionStatus.PREDICTION;
        },
        fetchAnswer: (state, action) => {
            state.status = PredictionStatus.FETCHING_ANSWER;
        },
        fetchPrediction: (state, action) => {
            state.status = PredictionStatus.FETCHING_PREDICTION;
        }
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
