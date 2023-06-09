import React, { FC, useEffect, useRef, useState } from 'react';

import { GraphPoint, FormattedGraphPoint, ScatterGraphPropTypes } from '../types/types';
import './styles.css';

const ScatterGraph: FC<ScatterGraphPropTypes> = ({
  data,
  yMin = 0,
  yMax,
  xMin = 0,
  xMax,
  yInterval,
  xInterval,
  graphHeight,
  axesColor,
  originAxisColor,
  renderYLabel,
  renderXLabel,
  scatterPointColor
}) => {
  // states
  const [pos, setPos] = useState({ x: 0, y: 0, yPlot: 0, xPlot: 0 });
  const [showVerticalLine, setShowVerticalLine] = useState(false);
  const [graphWidth, setGraphWidth] = useState(0);

  // refs
  const parentNode = useRef<HTMLDivElement | null>(null);
  const yPointsRef = useRef<HTMLDivElement | null>(null);

  // useEffects
  useEffect(() => {
    window.onresize = (): void => {
      setGraphWidth(parentNode?.current?.clientWidth || 0);
    };

    setGraphWidth(parentNode?.current?.clientWidth || 0);
  }, [parentNode]);

  // consts
  const textHeight = 16;
  const graphHeightDiff = yMax - yMin;
  const graphWidthDiff = xMax - xMin;
  const yRatio = graphHeight / graphHeightDiff;
  const xRatio = graphWidth / graphWidthDiff;

  const yPoints = Array.from({ length: graphHeightDiff / yInterval + 1 }, (_, index) => index * yInterval + yMin);
  const xPoints = Array.from({ length: graphWidthDiff / xInterval + 1 }, (_, index) => index * xInterval + xMin);

  const getGraphCoordinate = (point: number, ratio: number): number => point * ratio;

  const formattedGraphPoints = data.map((point: GraphPoint) => ({
    ...point,
    yPlot: graphHeight - getGraphCoordinate(point.y, yRatio) + getGraphCoordinate(yMin, yRatio),
    xPlot: getGraphCoordinate(point.x, xRatio) - getGraphCoordinate(xMin, xRatio)
  }));

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {showVerticalLine && (
        <div
          className='verticalLine'
          style={{
            top: pos.yPlot + 20,
            left: pos.xPlot + 40
          }}
        >
          x: {pos.x}
          <br />
          y: {pos.y}
        </div>
      )}
      <div style={{ paddingRight: 6 }} ref={yPointsRef}>
        {yPoints.reverse().map((yLabel: number | string, index: number) => (
          <div
            key={index}
            className='yPoints'
            style={{
              top: index * getGraphCoordinate(yInterval, yRatio) - index * textHeight - 7
            }}
          >
            {renderYLabel ? renderYLabel(yLabel) : yLabel}
          </div>
        ))}
      </div>
      <div className='svgWrapper' id='graph-svg-wrapper' ref={parentNode}>
        <svg width={graphWidth} height={graphHeight} version='1.1' viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
          {yPoints.map((_, index) => (
            <line
              key={index}
              x1='0'
              x2={graphWidth}
              y1={`${index * getGraphCoordinate(yInterval, yRatio)}`}
              y2={`${index * getGraphCoordinate(yInterval, yRatio)}`}
              strokeDasharray={4}
              stroke={axesColor}
              strokeWidth={1}
              style={{ zIndex: 1 }}
            />
          ))}
          {showVerticalLine && (
            <line
              x1={pos.xPlot}
              x2={pos.xPlot}
              y1={0}
              y2={graphHeight}
              strokeDasharray='4'
              stroke={axesColor}
              strokeWidth={1}
              className='hoverVerticalLine'
            />
          )}
          {formattedGraphPoints.map((grapghPoint: FormattedGraphPoint, index: number) => (
            <circle
              key={index}
              cx={grapghPoint.xPlot}
              cy={grapghPoint.yPlot}
              fill={scatterPointColor ? scatterPointColor(grapghPoint) : '#f00'}
              className='dotHover'
              onMouseEnter={(): void => {
                setPos(grapghPoint);
                setShowVerticalLine(true);
              }}
              onMouseLeave={(): void => {
                setShowVerticalLine(false);
              }}
            />
          ))}
          <line x1={0} x2={graphWidth} y1={graphHeight} y2={graphHeight} stroke={originAxisColor} strokeWidth={1} />
          <line x1={0} x2={0} y1={0} y2={graphHeight} stroke={originAxisColor} strokeWidth={1} />
        </svg>
        <div style={{ paddingRight: 6, display: 'flex' }}>
          {xPoints.map((text, index) => (
            <div
              key={index}
              className='xPoints'
              style={{
                top: graphHeight + 5,
                left: index * (graphWidth / (xPoints.length - 1)) - 10.5
              }}
            >
              {renderXLabel ? renderXLabel(text) : text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ScatterGraph.defaultProps = {
  graphHeight: 400,
  axesColor: '#9E9E9E',
  originAxisColor: '#9E9E9E'
};

export default ScatterGraph;
