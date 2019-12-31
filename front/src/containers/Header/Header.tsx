import React, {useMemo} from 'react';
import Timer from "../Timer/Timer"
import {predictionActions, predictionSelectors} from "../../modules/prediction"
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {TimerStatus} from "../../constants/timerStatus";
import Button from "../../components/Button/Button";
import {bindActionCreators} from "redux";
import {timerActions, timerSelectors} from "../../modules/timer";
import {Grid} from "@material-ui/core";
import AnswerSelect from "../AnswerSelect/AnswerSelect";

const Header: React.FC = () => {
    const { state, milliseconds } = useSelector(timerSelectors);
    const { answer, prediction, answers, random } = useSelector(predictionSelectors);
    const { setAnswer, resetTimer, abortTimer } = useBoundActions();
    const start = () => {
        if (random) {
            setAnswer(answers[Math.floor(Math.random() * answers.length)]);
        }
        resetTimer(null);
    };
    return (
        <Container className="Header">
            <AnswerText>お題 「{random && (state !== TimerStatus.WORKING) ? "???" : answer}」</AnswerText>
            <Wrapper>
                {(state === TimerStatus.WORKING) && <PredictionText>AI判定→ {prediction} ?</PredictionText>}
                {(state === TimerStatus.WORKING) ? <Timer /> : <AnswerSelect />}
            </Wrapper>
            {(state === TimerStatus.INITIAL) && <Button onClick={start}>スタート</Button>}
            {(state === TimerStatus.WORKING) && <Button onClick={() => abortTimer(null)} color={"secondary"}>ギブアップ</Button>}
            {(state === TimerStatus.FINISH || state === TimerStatus.ABORT) && <Button onClick={start}>もう一回</Button>}
            {(state === TimerStatus.FINISH) && <ResultText>記録: {(milliseconds/1000).toFixed(2)}秒</ResultText>}
        </Container>
    );
};

export default Header;

const useBoundActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(
            {
                resetTimer: timerActions.resetTimer,
                abortTimer: timerActions.abortTimer,
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
    text-align: right;
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
