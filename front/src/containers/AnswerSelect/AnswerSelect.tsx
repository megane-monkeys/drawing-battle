import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {predictionActions, predictionSelectors} from "../../modules/prediction";
import {PredictionDefaultAnswer} from "../../constants/predictionStatus";

const AnswerSelect: React.FC = () => {
    const state = useSelector(predictionSelectors);
    const { fetchAnswers, setAnswer } = useBoundActions();
    useEffect(() => {
        fetchAnswers(null);
    }, []);
    return (
        <Container>
            <select onChange={(e) => setAnswer(e.target.value)} value={state.selectedAnswer}>
                <option value={PredictionDefaultAnswer}>{PredictionDefaultAnswer}</option>
                {state.answers.map((d, i) => {
                return(<option value={d}>{i+1}: {d}</option>);
            })}</select>
        </Container>
    );
};

export default AnswerSelect;

const useBoundActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(
            {
                fetchAnswers: predictionActions.fetchAnswers,
                setAnswer: predictionActions.setAnswer
            },
            dispatch
        );
    }, [dispatch]);
};


const Container = baseStyled(Grid)`
  flex: 1;
  width: 100%;
  margin: auto;
  position: relative;
`;
