import React, {useEffect} from 'react';
import {predictionActions, predictionSelectors} from "../../modules/prediction"
import {useSelector} from "react-redux";
import styled from "styled-components";
import {AppStatus} from "../../constants/appStatus";
import Button from "../../components/Button/Button";
import {timerActions, timerSelectors} from "../../modules/timer";
import {Grid} from "@material-ui/core";
import AnswerSelect from "../AnswerSelect/AnswerSelect";
import {appActions, appSelectors} from "../../modules/app";
import {useBoundActions} from "../../components/hooks/useBoundActions";
import * as d3 from "d3";

const Header: React.FC = () => {
    const { milliseconds } = useSelector(timerSelectors);
    const { state } = useSelector(appSelectors);
    const { answer, prediction, answers, random } = useSelector(predictionSelectors);
    const { abort, ready, start, success } = useBoundActions(appActions);
    const { setAnswer } = useBoundActions(predictionActions);
    const { restartTimer, stopTimer } = useBoundActions(timerActions);

    useEffect(() => {
        document.title = "Drawing Race";
    });

    useEffect(() => {
        if (answer === prediction) {
            stopTimer(null);
            success(null);
        }
    }, [prediction]);

    const onStartClick = () => {
        if (random) {
            setAnswer(answers[Math.floor(Math.random() * answers.length)]);
        }
        restartTimer(null);
        start(null);
    };
    return (
        <Container className="Header">
            <AnswerText>お題 「{random && (state === AppStatus.READY) ? "???" : answer}」</AnswerText>
            <Wrapper>
                {(state === AppStatus.READY) ? <AnswerSelect /> : <PredictionText>AI判定→ {prediction} {prediction === answer ? "!" : "?"}</PredictionText>}
            </Wrapper>
            {(state === AppStatus.READY) && <Button onClick={onStartClick}>スタート</Button>}
            {(state === AppStatus.DRAWING) && <Button onClick={() => abort(null)} color={"secondary"}>ギブアップ</Button>}
            {(state === AppStatus.SUCCESS || state === AppStatus.ABORT) && <Button onClick={() => ready(null)}>もう一回</Button>}
            {(state === AppStatus.SUCCESS) && <ResultText>記録: {(milliseconds/1000).toFixed(2)}秒</ResultText>}
        </Container>
    );
};

export default Header;

const Container = styled.div`
    text-align: center;
`;

const Wrapper = styled.div`
    display: flex;
    height: 40px;
    margin: 0 30px;
`;
const ResultText = styled(Grid)`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: blue;
  font-size: 40px;
  font-weight: bold;
  opacity: 0.7;
`;
const PredictionText = styled(Grid)`
  margin: auto;
`;
const AnswerText = styled.h2`
  margin: auto;
`;
