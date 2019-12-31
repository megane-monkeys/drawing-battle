import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";
import {TimerStatus} from "../../constants/timerStatus";
import {bindActionCreators} from "redux";
import {timerActions, timerSelectors} from "../../modules/timer";
import {predictionActions, predictionSelectors} from "../../modules/prediction";

const Canvas: React.FC = () => {
    const { state } = useSelector(timerSelectors);
    const { answer, prediction } = useSelector(predictionSelectors);
    const { initialize, startTimer, fetchPrediction, stopTimer, pushStrokes } = useBoundActions();
    let data: number[][] = [];
    // TODO: useRef使ってもっとうまくできそう
    useEffect(() => {
        const color = '#000';
        const strokeWidth = '5px' ;
        let activeLine: d3.Selection<SVGPathElement, never[], HTMLElement, any> | null;

        const renderPath = d3.line()
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .curve(d3.curveBasis);

        const dragstarted = () => {
            if (state !== TimerStatus.WORKING) {
                return;
            }
            activeLine = svg.append('path')
                .datum([])
                .attr('class', 'line')
                .attr('stroke',color)
                .attr('stroke-width',strokeWidth)
                .attr('fill','transparent')
        };

        const dragged = () => {
            if (state !== TimerStatus.WORKING) {
                return;
            }
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
            if (state !== TimerStatus.WORKING) {
                return;
            }
            pushStrokes(data);
            fetchPrediction(null);
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

        if (answer === prediction && state === TimerStatus.WORKING) {
            stopTimer(null);
        }
        if (state === TimerStatus.RESETTING) {
            initialize(null);
            clear();
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
                fetchPrediction: predictionActions.fetchPrediction,
                initialize: predictionActions.initialize,
                pushStrokes: predictionActions.pushStrokes,
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

