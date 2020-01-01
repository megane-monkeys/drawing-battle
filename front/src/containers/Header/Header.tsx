import React, {useEffect, useMemo} from 'react';
import {predictionActions, predictionSelectors} from "../../modules/prediction"
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {AppStatus} from "../../constants/appStatus";
import Button from "../../components/Button/Button";
import {bindActionCreators} from "redux";
import {timerSelectors} from "../../modules/timer";
import {Grid} from "@material-ui/core";
import AnswerSelect from "../AnswerSelect/AnswerSelect";
import {appActions, appSelectors} from "../../modules/app";

const Header: React.FC = () => {
    const { milliseconds } = useSelector(timerSelectors);
    const { state } = useSelector(appSelectors);
    const { answer, prediction, answers, random } = useSelector(predictionSelectors);
    const { setAnswer, reset, abort, ready } = useBoundActions();

    useEffect(() => {
        document.title = "Drawing Race";
    });

    const start = () => {
        if (random) {
            setAnswer(answers[Math.floor(Math.random() * answers.length)]);
        }
        reset(null);
    };
    return (
        <Container className="Header">
            <AnswerText>お題 「{random && (state === AppStatus.READY) ? "???" : answer}」</AnswerText>
            <Wrapper>
                {(state === AppStatus.READY) ? <AnswerSelect /> : <PredictionText>AI判定→ {prediction} {prediction === answer ? "!" : "?"}</PredictionText>}
            </Wrapper>
            {(state === AppStatus.READY) && <Button onClick={start}>スタート</Button>}
            {(state === AppStatus.DRAWING) && <Button onClick={() => abort(null)} color={"secondary"}>ギブアップ</Button>}
            {(state === AppStatus.SUCCESS || state === AppStatus.ABORT) && <Button onClick={() => ready(null)}>もう一回</Button>}
            {(state === AppStatus.SUCCESS) && <ResultText>記録: {(milliseconds/1000).toFixed(2)}秒</ResultText>}
        </Container>
    );
};

export default Header;

const useBoundActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(
            {
                reset: appActions.reset,
                abort: appActions.abort,
                ready: appActions.ready,
                setAnswer: predictionActions.setAnswer,
            },
            dispatch
        );
    }, [dispatch]);
};
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
