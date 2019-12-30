import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import timerSelector from "../../modules/timer/selector"
import {actions as timerActions} from "../../modules/timer/slice"
import {TimerStatus} from "../../constants/timerStatus";

const Timer: React.FC = () => {
    const state = useSelector(timerSelector);
    const { updateTimer, startTimer, stopTimer } = useBoundActions();
    useEffect(() => {
        if (state.state === TimerStatus.WORKING){
            setTimeout(() => {
                updateTimer(null);
            }, 100);
        }
    });
    return (
        <Container>
            <button id="start" onClick={() => startTimer(null)}>start</button>
            <span>{(state.milliseconds/1000).toFixed(2)}</span>
            <button id="stop" onClick={() => stopTimer(null)}>stop</button>
        </Container>
    );
};

export default Timer;

const useBoundActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(
            {
                updateTimer: timerActions.updateTimer,
                startTimer: timerActions.startTimer,
                stopTimer: timerActions.stopTimer
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
