import { actions } from "./slice";
import axios from "axios"
import { put, call, takeEvery } from 'redux-saga/effects';

const fetchAnswerAjax = () => {
    return (axios.get(
        'http://localhost:3001/d-battle/api/v1/answers',
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

export const sagas = [
        takeEvery(actions.fetchAnswer.toString(), fetchAnswer)
    ];

