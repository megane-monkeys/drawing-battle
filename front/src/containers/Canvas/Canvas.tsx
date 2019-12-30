import React, { useEffect } from 'react';
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";

const Canvas: React.FC = () => {

    useEffect(() => {

        const color = '#000';
        const strokeWidth = '5px' ;
        let activeLine: d3.Selection<SVGPathElement, never[], HTMLElement, any> | null;
        let data: [number, number, number][] = [];
        let sendingData = [];

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
            data.push(d3.mouse(container).concat([new Date().getTime()]) as [number, number, number]);
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

        d3.select('#clear').on('click', () => {
            d3.selectAll('path.line').remove();
            data = [];
        });
    }, []);
    return (
        <Container>
            <button id="clear">clear</button>
            <svg id="canvas"/>
        </Container>
    );
};

export default Canvas;


const Container = baseStyled(Grid)`
  flex: 1;
  height: 80vh;
  width: 90%;
  margin: auto;
  position: relative;
`;
