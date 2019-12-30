import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { timerSelectors, timerActions } from "../../modules/timer"
import {TimerStatus} from "../../constants/timerStatus";

const Timer: React.FC = () => {
    const state = useSelector(timerSelectors);
    const { updateTimer } = useBoundActions();
    useEffect(() => {
        if (state.state === TimerStatus.WORKING){
            setTimeout(() => {
                updateTimer(null);
            }, 100);
        }
    });
    return (
        <Container>
            <span>{(state.milliseconds/1000).toFixed(2)} 秒</span>
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
