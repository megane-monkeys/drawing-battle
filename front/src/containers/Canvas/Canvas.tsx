import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";
import {AppStatus} from "../../constants/appStatus";
import {predictionActions} from "../../modules/prediction";
import {appSelectors} from "../../modules/app";
import {useBoundActions} from "../../components/hooks/useBoundActions";

const Canvas: React.FC = () => {
    const { state } = useSelector(appSelectors);
    const { initPrediction, fetchPrediction } = useBoundActions(predictionActions);
    const sendingData = useRef<number[][][]>([]);
    const data = useRef<number[][]>([]);

    useEffect(() => {
        const color = '#000';
        const strokeWidth = '5px';
        let activeLine: d3.Selection<SVGPathElement, never[], HTMLElement, any> | null;

        const renderPath = d3.line()
            .x(function (d) {
                return d[0];
            })
            .y(function (d) {
                return d[1];
            })
            .curve(d3.curveBasis);

        const dragstarted = () => {
            data.current = [];
            if (state !== AppStatus.DRAWING) {
                return;
            }
            activeLine = svg.append('path')
                .datum([])
                .attr('class', 'line')
                .attr('stroke', color)
                .attr('stroke-width', strokeWidth)
                .attr('fill', 'transparent')
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
            data.current.push(d3.mouse(container).concat([new Date().getTime()]));
            activeLine.datum(data.current);
            activeLine.attr('d', renderPath);
        };

        const dragended = () => {
            if (state !== AppStatus.DRAWING) {
                return;
            }
            sendingData.current.push(data.current);
            fetchPrediction(sendingData.current);
            activeLine = null;
        };

        const svg = d3.select<SVGElement, unknown>('#canvas')
            .style('width', '100%')
            .style('height', '100%')
            .style('border', 'solid 1px #707070')
            .style('border-radius', '5px')
            .call(
                d3.drag<SVGElement, unknown>()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended)
            );
    });

    useEffect(() => {
        if (state === AppStatus.READY) {
            d3.selectAll('path.line').remove();
            sendingData.current = [];
            initPrediction(null);
        }
    }, [state, initPrediction]);

return (
    <Container>
        <svg id="canvas"/>
    </Container>
    );
};

export default Canvas;

const Container = baseStyled(Grid)`
  flex: 1;
  height: 70vh;
  width: 90%;
  margin: auto;
  position: relative;
`;

