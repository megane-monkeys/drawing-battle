import React, {useMemo} from 'react';
import Timer from "../Timer/Timer"
import {predictionSelectors} from "../../modules/prediction"
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {TimerStatus} from "../../constants/timerStatus";
import Button from "../../components/Button/Button";
import {bindActionCreators} from "redux";
import {timerActions, timerSelectors} from "../../modules/timer";
import {Grid} from "@material-ui/core";

const Header: React.FC = () => {
    const timerState = useSelector(timerSelectors);
    const predictionState = useSelector(predictionSelectors);
    const { resetTimer, abortTimer } = useBoundActions();

    return (
        <Container className="Header">
            <h2>お題 「{predictionState.answer || "???"}」</h2>
            <Wrapper>
                <PredictionText>AI判定→ {predictionState.prediction} {predictionState.answer === predictionState.prediction ? "!" : "?"}</PredictionText>
                <Timer />
            </Wrapper>
            {(timerState.state === TimerStatus.INITIAL) && <Button onClick={() => resetTimer(null)}>スタート</Button>}
            {(timerState.state === TimerStatus.WORKING) && <Button onClick={() => abortTimer(null)} color={"secondary"}>ギブアップ</Button>}
            {(timerState.state === TimerStatus.FINISH || timerState.state === TimerStatus.ABORT) && <Button onClick={() => resetTimer(null)}>もう一回</Button>}
            {(timerState.state === TimerStatus.FINISH) && <ResultText>記録: {(timerState.milliseconds/1000).toFixed(2)}秒</ResultText>}
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
    margin: 0 10%;
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
