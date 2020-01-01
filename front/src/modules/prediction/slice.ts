import { createSlice } from "@reduxjs/toolkit";
type State = {
    answers: string[];
    answer: string;
    prediction: string;
    random: boolean;
}
const initialState: State = {
    answers: [],
    answer: "",
    prediction: "-",
    random: true,
};

const slice = createSlice({
    name: "prediciton",
    initialState,
    reducers: {
        initPrediction: (state, action) => {
            state.prediction = "-";
        },
        toggleRandom: (state, action) => {
            state.random = !state.random;
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setAnswer: (state, action) => {
            state.answer = action.payload;
        },
        setPrediction: (state, action: { payload: string; type: string } & {}) => {
            state.prediction = action.payload;
        },
        fetchAnswers: (state, action) => {
            // sagaトリガー用
        },
        fetchPrediction: (state, action) => {
            // sagaトリガー用
        },
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
