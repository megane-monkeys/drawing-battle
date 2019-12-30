import React, {useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";
import {TimerStatus} from "../../constants/timerStatus";
import Button from "../../components/Button/Button";
import {bindActionCreators} from "redux";
import {timerSelectors, timerActions} from "../../modules/timer";
import {predictionSelectors, predictionActions} from "../../modules/prediction";

const Canvas: React.FC = () => {
    const timerState = useSelector(timerSelectors);
    const predictionState = useSelector(predictionSelectors);
    const { initialize, fetchAnswer, startTimer, fetchPrediction, resetTimer, stopTimer } = useBoundActions();
    let data: number[][] = [];
    let sendingData: number[][][] = [];

    const start = () => {
        startTimer(null);
        fetchAnswer(null);
    };
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
            fetchPrediction(sendingData);
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

        if (predictionState.answer === predictionState.prediction) {
            stopTimer(null);
        }
        if (timerState.state === TimerStatus.RESETTING) {
            initialize(null);
            clear();
            fetchAnswer(null);
            startTimer(null);
        }
    }, [data]);
    return (
        <Container>
            {(timerState.state === TimerStatus.INITIAL) && <Button onClick={start}>スタート</Button>}
            {(timerState.state === TimerStatus.FINISH) && <Button onClick={() => resetTimer(null)}>もう一回</Button>}
            {(timerState.state === TimerStatus.FINISH) && <ResultText>記録: {(timerState.milliseconds/1000).toFixed(2)}秒</ResultText>}
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
                stopTimer: timerActions.stopTimer,
                setAnswer: predictionActions.setAnswer,
                fetchAnswer: predictionActions.fetchAnswer,
                setPrediction: predictionActions.setPrediction,
                fetchPrediction: predictionActions.fetchPrediction,
                initialize: predictionActions.initialize,
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
  color: dimgray;
  font-size: 32px;
  font-weight: bold;
  text-stroke: 3px white; 
  -webkit-text-stroke: 1px white; 
`;
