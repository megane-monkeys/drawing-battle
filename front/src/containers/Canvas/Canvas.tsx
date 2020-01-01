import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";
import {AppStatus} from "../../constants/appStatus";
import {bindActionCreators} from "redux";
import {timerActions} from "../../modules/timer";
import {predictionActions, predictionSelectors} from "../../modules/prediction";
import {appActions, appSelectors} from "../../modules/app";

const Canvas: React.FC = () => {
    const { state } = useSelector(appSelectors);
    const { answer, prediction } = useSelector(predictionSelectors);
    const { initialize, startTimer, fetchPrediction, stopTimer, pushStrokes, success, start } = useBoundActions();
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
            if (state !== AppStatus.DRAWING) {
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
            if (state !== AppStatus.DRAWING) {
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
            if (state !== AppStatus.DRAWING) {
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

        if (answer === prediction && state === AppStatus.DRAWING) {
            stopTimer(null);
            success(null);
        }
        if (state === AppStatus.RESETTING) {
            clear();
            initialize(null);
            startTimer(null);
            start(null);
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
                startTimer: timerActions.restartTimer,
                stopTimer: timerActions.stopTimer,
                ready: appActions.ready,
                start: appActions.start,
                success: appActions.success,
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

