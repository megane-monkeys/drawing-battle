import { actions } from "./slice";
import axios from "axios"
import { put, call, takeEvery } from 'redux-saga/effects';
import { Endpoints } from "../../constants/endpoints";

const fetchAnswerAjax = () => {
    return (axios.get(Endpoints.answer,
    { params: {
                seed: 1
                }
            }
    )
        .then((res) => {
            const data = res.data;
            return { data }
        })
        .catch((error) => {
            return { error }
        }));

};

function* fetchAnswer() {
    const { data, error } = yield call(fetchAnswerAjax);
    if (data) {
        yield put(actions.setAnswer(data.label));
    } else {
        console.log(error);
    }
}

const fetchPredictionAjax = (strokes: number[][][]) => {
    return (axios.post(Endpoints.prediction,
        strokes
)
        .then((res) => {
            const data = res.data;
            return { data }
        })
        .catch((error) => {
            return { error }
        }));

};

function* fetchPrediction(action: { payload: any; type: string } & {}) {
    const strokes = action.payload;
    const { data, error } = yield call(fetchPredictionAjax, strokes);
    if (data) {
        yield put(actions.setPrediction(data.label));
    } else {
        console.log(error);
    }
}
export const sagas = [
    takeEvery(actions.fetchAnswer.toString(), fetchAnswer),
    takeEvery(actions.fetchPrediction.toString(), fetchPrediction)
];

