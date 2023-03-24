import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScatterGraph from '../scatter-graph/ScatterGraph';
import { GraphPoint } from '../types/types';

const data = [
  {
    x: 100,
    y: 150
  },
  {
    x: 120,
    y: 230
  },
  {
    x: 200,
    y: 345
  },
  {
    x: 150,
    y: 255
  },
  {
    x: 170,
    y: 175
  },
  {
    x: 70,
    y: 160
  },
  {
    x: 50,
    y: 90
  },
  {
    x: 110,
    y: 80
  },
  {
    x: 140,
    y: 150
  },
  {
    x: 130,
    y: 210
  },
  {
    x: 100,
    y: 305
  },
  {
    x: 350,
    y: 455
  },
  {
    x: 130,
    y: 275
  },
  {
    x: 500,
    y: 300
  },
  {
    x: 120,
    y: 300
  },
  {
    x: 300,
    y: 180
  }
];

const data2 = [
  {
    x: 450,
    y: 150
  },
  {
    x: 360,
    y: 330
  },
  {
    x: 650,
    y: 315
  },
  {
    x: 270,
    y: 200
  },
  {
    x: 240,
    y: 155
  },
  {
    x: 570,
    y: 160
  },
  {
    x: 500,
    y: 100
  },
  {
    x: 130,
    y: 280
  },
  {
    x: 140,
    y: 110
  },
  {
    x: 520,
    y: 260
  },
  {
    x: 750,
    y: 315
  },
  {
    x: 655,
    y: 355
  },
  {
    x: 430,
    y: 275
  },
  {
    x: 360,
    y: 300
  },
  {
    x: 120,
    y: 300
  },
  {
    x: 240,
    y: 280
  }
];

export default {
  title: 'Example/ScatterGraph',
  component: ScatterGraph,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ScatterGraph>;

const Template: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data}
    yMax={500}
    xMax={600}
    yInterval={50}
    xInterval={50}
    graphHeight={500}
    renderYLabel={(item: string | number): string => `${item} Y`}
    renderXLabel={(item: string | number): string => `${item} X`}
  />
);

const Template2: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data2}
    yMax={500}
    xMax={800}
    yInterval={50}
    xInterval={40}
    graphHeight={300}
    scatterPointColor={({ x }: GraphPoint): string => {
      if (x > 400) return '#0000FF';
      else return '#FF0000';
    }}
  />
);

export const ScatterGraph1 = Template.bind({});
export const ScatterGraph2 = Template2.bind({});
