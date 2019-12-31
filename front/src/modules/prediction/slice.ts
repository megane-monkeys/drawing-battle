import { createSlice } from "@reduxjs/toolkit";
import { PredictionStatus } from "../../constants/predictionStatus"
type State = {
    answers: string[];
    selectedAnswer: string;
    prediction: string;
    status: string;
    strokes: number[][][];
}
const initialState: State = {
    answers: [],
    selectedAnswer: "",
    prediction: "-",
    status: PredictionStatus.INITIAL,
    strokes: []
};

const slice = createSlice({
    name: "prediciton",
    initialState,
    reducers: {
        initialize: (state, action) => {
            state.status = PredictionStatus.INITIAL;
            state.selectedAnswer = "";
            state.prediction = "-";
            state.strokes = [];
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setAnswer: (state, action) => {
            state.selectedAnswer = action.payload;
            state.status = PredictionStatus.PREDICTION;
        },
        setPrediction: (state, action: { payload: string; type: string } & {}) => {
            state.prediction = action.payload;
            state.status = PredictionStatus.PREDICTION;
        },
        fetchAnswers: (state, action) => {
            state.status = PredictionStatus.FETCHING_ANSWERS;
        },
        fetchPrediction: (state, action) => {
            state.status = PredictionStatus.FETCHING_PREDICTION;
        },
        pushStrokes: (state, action: { payload: number[][]; type: string } & {}) => {
            state.strokes.push(action.payload)
        }
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
