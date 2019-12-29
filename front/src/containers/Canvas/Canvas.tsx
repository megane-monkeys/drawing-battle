import React, { useEffect } from 'react';
import { Grid } from "@material-ui/core";
import baseStyled from "styled-components";
import * as d3 from "d3";

const Canvas: React.FC = () => {

    useEffect(() => {

        const color = '#000';
        const strokeWidth = '5px' ;
        let activeLine: d3.Selection<SVGPathElement, never[], HTMLElement, any> | null;
        let data: [number, number][] = [];

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
            data.push(d3.mouse(container));
            activeLine.datum(data);
            activeLine.attr('d', renderPath);
        };

        const dragended = () => {
            activeLine = null;
            data = [];
            console.log(data);
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

const width = 1000,
    height = 600;

const margin = {
    top: 50,
    bottom: 50,
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
