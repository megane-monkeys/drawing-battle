import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import timerSelector from "../../modules/timer/selector"
import timerModule from "../../modules/timer/slice"

const Timer: React.FC = () => {
    const state = useSelector(timerSelector);
    const dispatch = useDispatch();
    console.log(dispatch);
    useEffect(() => {
        setInterval(() => {
            dispatch(timerModule.actions.updateTimer());
        }, 1000);
    });
    return (
        <Container>
            <button id="start" >start</button>
            <span>{state.time}</span>
        </Container>
    );
};

export default Timer;

const width = 1000,
    height = 50;

const margin = {
    top: 10,
    bottom: 10,
    right: 50,
    left: 50
};

const Container = baseStyled(Grid)`
  flex: 1;
  width: ${width + margin.left + margin.right}px;
  height: ${height + margin.top + margin.bottom}px;
  margin: auto;
  position: relative;
`;
