
# React Scatter graph
<a href="https://www.npmjs.com/package/react-vertical-stepper"><img src="https://badgen.net/npm/v/react-vertical-stepper?color=blue" alt="npm version"></a> <a href="https://www.npmjs.com/package/react-vertical-stepper" ><img src="https://img.shields.io/npm/dw/react-vertical-stepper?label=Downloads" /></a> <a href="https://github.com/KeyValueSoftwareSystems/react-vertical-stepper"><img src="https://github.com/KeyValueSoftwareSystems/react-vertical-stepper/actions/workflows/update-and-publish.yml/badge.svg" alt="" /></a>

<div align="center">
<img src="./src/assets/vertical-stepper-example.png" alt="" width="269" height="416"/>
</div>

A fully customizable ready to use scatter graph UI package for React.
Try tweaking a vertical stepper using this codesandbox link <a href="https://codesandbox.io/s/vertical-stepper-demo-x24q7u" >here</a>

## Installation

```bash
npm install @keyvaluesystems/react-scatter-graph
```

You’ll need to install React separately since it isn't included in the package.

## Usage

React Scatter Graph can run in a very basic mode like this:

```jsx
import  React,  {  useState  }  from  'react';
import ReactScatterGraph from '@keyvaluesystems/react-scatter-graph';

function  App()  {  
  data = [
    { x: 450, y: 150 },
    { x: 360, y: 330 },
    { x: 650, y: 315 },
    { x: 270, y: 200}
  ];

  return (
    <ScatterGraph
      data={data}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
    />
  );
}

export default App;
```
The `data` array is an array of objects with basic keys like

-  `x` - an integer  that can be shown as step label title to your step indicator
-  `y` - a string that can be show as step description below the step label

>Note:  You can also add any other keys to the step object and other statuses like `skipped` for different customizations as per requirements

You can customize the step indicator bubble with your own DOM element using the `renderBubble` prop

```jsx
<Stepper
  steps={stepsArray}
  currentStepIndex={currentStepIndex}
  renderBubble={(step, stepIndex) => (<div key={stepIndex}>{step.label}</div>)}
/>
```
The `step` param provided by the `renderBubble` callback is the same object you pass as array item in `steps` prop.

## Props

Props that can be passed to the component are listed below:

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><b>data:</b> object[]</code></td>
      <td>An array of x-y cordinates to render.</td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>yMin?:</b> number</code></td>
      <td>Minimum value of Y - axis.</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code><b>yMax:</b> number</code></td>
      <td>Maximum value of Y - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>xMin?:</b> number</code></td>
      <td>Minimum value of X - axis.</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code><b>xMax:</b> number</code></td>
      <td>Maximum value of X - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>xInterval:</b> number</code></td>
      <td>Interval value X - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>yInterval:</b> number</code></td>
      <td>Interval value Y - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>graphHeight:</b> number</code></td>
      <td>Height of graph in pixel</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>renderYLabel?:</b> (arg: number | string): string</code></td>
      <td>
        Render function for customizing Y axis label
      </td>
      <td><code>undefined</code></td>
    </tr>
        <tr>
      <td><code><b>renderXLabel?:</b> (arg: number | string): string</code></td>
      <td>
        Render function for customizing X axis label
      </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>scatterPointColor?:</b> (arg: GraphPoint): string</code></td>
      <td>
        Render function for customizing scatter point color.
      </td>
      <td><code>undefined</code></td>
    </tr>
  </tbody>
</table>

## Style Customizations

All the default styles provided by this package are overridable using the `style` prop
the below code shows all the overridable styles:

```jsx
import React from 'react';
import Stepper from 'react-vertical-stepper';

function App() {

 const stylesOverrride = {
   LabelTitle: (step, stepIndex) => ({...styles}),
   ActiveLabelTitle: (step, stepIndex) => ({...styles}),
   LabelDescription: (step, stepIndex) => ({...styles}),
   ActiveLabelDescription: (step, stepIndex) => ({...styles}),
   LineSeparator: (step, stepIndex) => ({...styles}),
   InactiveLineSeparator: (step, stepIndex) => ({...styles}),
   Bubble: (step, stepIndex) => ({...styles}),
   ActiveBubble: (step, stepIndex) => ({...styles}),
   InActiveBubble: (step, stepIndex) => ({...styles}),
 };
 return (
   <Stepper
     steps={stepsArray}
	 currentStepIndex={currentStepIndex}
	 styles={stylesOverrride}
   />
 );
}

export default App;
```
  
-  `LabelTitle` - overrides the step label style
-  `ActiveLabelTitle` - overrides the step label style of current active step
-  `LabelDescription` - overrides the step description style
-  `ActiveLabelDescription` - overrides the step description style of current active step
-  `LineSeparator` - overrides default step connector line styles
-  `InactiveLineSeparator` - overrides styles of step connector line after current active step
-  `Bubble` - overrides default styles of step indicator
-  `ActiveBubble` - overrides default styles of step indicator of current active step
-  `InActiveBubble` - overrides default styles of step indicator that has `unvisited` step status