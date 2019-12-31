import { createSlice } from "@reduxjs/toolkit";
import { PredictionStatus } from "../../constants/predictionStatus"
type State = {
    answers: string[];
    answer: string;
    prediction: string;
    random: boolean;
    status: string;
    strokes: number[][][];
}
const initialState: State = {
    answers: [],
    answer: "",
    prediction: "-",
    random: true,
    status: PredictionStatus.INITIAL,
    strokes: []
};

const slice = createSlice({
    name: "prediciton",
    initialState,
    reducers: {
        initialize: (state, action) => {
            state.status = PredictionStatus.INITIAL;
            state.prediction = "-";
            state.strokes = [];
        },
        toggleRandom: (state, action) => {
            state.random = !state.random;
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setAnswer: (state, action) => {
            state.answer = action.payload;
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
