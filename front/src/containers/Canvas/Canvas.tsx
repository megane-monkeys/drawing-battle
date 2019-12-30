import React, {useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";
import timerSelector from "../../modules/timer/selector"
import {TimerStatus} from "../../constants/timerStatus";
import Button from "../../components/Button/Button";
import {bindActionCreators} from "redux";
import {actions as timerActions} from "../../modules/timer/slice";

const Canvas: React.FC = () => {
    const state = useSelector(timerSelector);
    const { updateTimer, startTimer, stopTimer, resetTimer } = useBoundActions();
    let data: number[][] = [];
    let sendingData = [];


    useEffect(() => {
        const color = '#000';
        const strokeWidth = '5px' ;
        let activeLine: d3.Selection<SVGPathElement, never[], HTMLElement, any> | null;

        const renderPath = d3.line()
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .curve(d3.curveBasis);

        const dragstarted = () => {
            activeLine = svg.append('path')
                .datum([])
                .attr('class', 'line')
                .attr('stroke',color)
                .attr('stroke-width',strokeWidth)
                .attr('fill','transparent')
        };

        const dragged = () => {
            const container = d3.select<SVGGElement, unknown>("#canvas").node();
            if (!container) {
                return;
            }
            if (!activeLine) {
                return;
            }
            data.push(d3.mouse(container).concat([new Date().getTime()]));
            activeLine.datum(data);
            activeLine.attr('d', renderPath);
        };

        const dragended = () => {
            sendingData.push(data);
            // TODO: ここでAPIへのPOSTをdispatch
            activeLine = null;
            data = [];
        };
        const drag = d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);

        const svg = d3.select('#canvas')
            .style('width', '100%')
            .style('height', '100%')
            .style('border', 'solid 1px #707070')
            .style('border-radius', '5px')
            .call(
                // @ts-ignore
                drag
            );

        const clear = () => {
            d3.selectAll('path.line').remove();
            data = [];
        };

        d3.select('#clear').on('click', clear);

        if (state.state === TimerStatus.RESETTING) {
            clear();
            startTimer(null);
        }
    }, [data]);
    return (
        <Container>
            {(state.state === TimerStatus.INITIAL) && <Button onClick={() => startTimer(null)}>start</Button>}
            {(state.state === TimerStatus.FINISH) && <Button onClick={() => resetTimer(null)}>restart</Button>}
            {(state.state === TimerStatus.FINISH) && <ResultText>{(state.milliseconds/1000).toFixed(2)}秒</ResultText>}
            <button id="clear">clear</button>
            <svg id="canvas"/>
        </Container>
    );
};

export default Canvas;


const useBoundActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(
            {
                updateTimer: timerActions.updateTimer,
                resetTimer: timerActions.resetTimer,
                startTimer: timerActions.startTimer,
                stopTimer: timerActions.stopTimer
            },
            dispatch
        );
    }, [dispatch]);
};

const Container = baseStyled(Grid)`
  flex: 1;
  height: 80vh;
  width: 90%;
  margin: auto;
  position: relative;
`;

const ResultText = baseStyled(Grid)`
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  font-size: 32px;
`;
