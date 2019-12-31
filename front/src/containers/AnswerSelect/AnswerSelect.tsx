import React, {ChangeEvent, useEffect, useMemo} from 'react';
import { bindActionCreators } from 'redux';
import { Grid, Switch } from "@material-ui/core";
import baseStyled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {predictionActions, predictionSelectors} from "../../modules/prediction";

const AnswerSelect: React.FC = () => {
    const { answers, answer, random} = useSelector(predictionSelectors);
    const { fetchAnswers, setAnswer, toggleRandom } = useBoundActions();
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAnswer(e.target.value);
    };
    useEffect(() => {
        if (answers.length === 0) {
            fetchAnswers(null);
        }
    }, []);
    return (
        <Container>
            出題:{" "}
                ランダム<Switch checked={!random} onChange={() => toggleRandom(null)} color="default" />選択
                <select disabled={random} onChange={onChange} value={answer}>
                {answers.map((d, i) => {
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
                setAnswer: predictionActions.setAnswer,
                toggleRandom: predictionActions.toggleRandom,
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
