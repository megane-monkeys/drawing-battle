import React, {ChangeEvent, useEffect} from 'react';
import { Grid, Switch } from "@material-ui/core";
import baseStyled from "styled-components";
import { useSelector } from "react-redux";
import {predictionActions, predictionSelectors} from "../../modules/prediction";
import {useBoundActions} from "../../components/hooks/useBoundActions";

const AnswerSelect: React.FC = () => {
    const { answers, answer, random } = useSelector(predictionSelectors);
    const { fetchAnswers, setAnswer, toggleRandom } = useBoundActions(predictionActions);
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAnswer(e.target.value);
    };
    useEffect(() => {
        if (answers.length === 0) {
            fetchAnswers(null);
        }
    });
    return (
        <Container>
                ランダム<Switch checked={!random} onChange={() => toggleRandom(null)} color="default" />選択
                <select disabled={random} onChange={onChange} value={answer}>
                {answers.map((d, i) => {
                return(<option value={d}>{i+1}: {d}</option>);
            })}</select>
        </Container>
    );
};

export default AnswerSelect;

const Container = baseStyled(Grid)`
  flex: 1;
  width: 100%;
  margin: auto;
  position: relative;
`;
