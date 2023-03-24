import React, { FC, useEffect, useRef, useState } from 'react';

import { GraphPoint, FormattedGraphPoint, ScatterGraphPropTypes } from '../types/types';
import './styles.css';

const ScatterGraph: FC<ScatterGraphPropTypes> = ({
  data,
  yMax,
  xMax,
  yInterval,
  xInterval,
  graphHeight,
  axesColor,
  xyBorderAxisColor,
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
  const yRatio = graphHeight / yMax;
  const xRatio = graphWidth / xMax;
  const yPoints = Array.from({ length: yMax / yInterval }, (_, index) => (index + 1) * yInterval);
  const xPoints = Array.from({ length: xMax / xInterval }, (_, index) => (index + 1) * xInterval);
  const formattedGraphPoints = data.map((point: GraphPoint) => ({
    ...point,
    yPlot: graphHeight - yRatio * point.y,
    xPlot: xRatio * point.x
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
              top: index * yRatio * yInterval - index * textHeight - 7
            }}
          >
            {renderYLabel ? renderYLabel(yLabel) : yLabel}
          </div>
        ))}
      </div>
      <div className='svgWrapper' id='graph-svg-wrapper' ref={parentNode}>
        <svg width={graphWidth} height={graphHeight} version='1.1' viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
          <line x1={0} x2={graphWidth} y1={graphHeight} y2={graphHeight} stroke={xyBorderAxisColor} strokeWidth={1} />
          <line x1={0} x2={0} y1={0} y2={graphHeight} stroke={xyBorderAxisColor} strokeWidth={1} />
          {yPoints.reverse().map((_, index) => (
            <line
              key={index}
              x1='0'
              x2={graphWidth}
              y1={`${index * yRatio * yInterval}`}
              y2={`${index * yRatio * yInterval}`}
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
        </svg>
        <div style={{ paddingRight: 6, display: 'flex' }}>
          {xPoints.map((text, index) => (
            <div
              key={index}
              className='xPoints'
              style={{
                top: graphHeight + 5,
                left: (index + 1) * (graphWidth / xPoints.length) - 10.5
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
  axesColor:'#9E9E9E',
  xyBorderAxisColor: '#9E9E9E'
}

export default ScatterGraph;
