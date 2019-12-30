import React, {useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";
import {TimerStatus} from "../../constants/timerStatus";
import {bindActionCreators} from "redux";
import {timerSelectors, timerActions} from "../../modules/timer";
import {predictionSelectors, predictionActions} from "../../modules/prediction";

const Canvas: React.FC = () => {
    const timerState = useSelector(timerSelectors);
    const predictionState = useSelector(predictionSelectors);
    const { initialize, fetchAnswer, startTimer, fetchPrediction, stopTimer } = useBoundActions();
    let data: number[][] = [];
    let sendingData: number[][][] = [];

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
                startTimer: timerActions.startTimer,
                stopTimer: timerActions.stopTimer,
                fetchAnswer: predictionActions.fetchAnswer,
                fetchPrediction: predictionActions.fetchPrediction,
                initialize: predictionActions.initialize,
            },
            dispatch
        );
    }, [dispatch]);
};

const Container = baseStyled(Grid)`
  flex: 1;
  height: 70vh;
  width: 90%;
  margin: auto;
  position: relative;
`;

