import { actions } from "./slice";
import axios from "axios"
import { put, call, takeEvery } from 'redux-saga/effects';

const fetchAnswerAjax = () => axios.get('http://localhost:3001/d-battle/api/v1/answers/0')
    .then((res) => {
        const data = res.data;
        console.log(data);
        return { data }
    })
    .catch((error) => {
        return { error }
    });

function* fetchAnswer() {
    const { data, error } = yield call(fetchAnswerAjax);
    if (data) {
        yield put(actions.setAnswer(data));
    } else {
        console.log(error);
    }
}

export const sagas = () => {
    return [
        takeEvery(actions.fetchAnswer.toString(), fetchAnswer)
    ];
};
