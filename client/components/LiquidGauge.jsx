import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';

const LiquidGauge = (props) => {
  const [initial, setInitial] = useState(0);
  setTimeout(() => {
    setInitial(100);
  }, 300);
  const gaugeVal = props.percent ? props.percent : initial;
  const startColor = '#FFFFFF'; //
  const endColor = '#FFFFFF';
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(gaugeVal / 100);
  const gradientStops = [
    {
      key: '0%',
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: '0%',
    },
    {
      key: '50%',
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: '50%',
    },
    {
      key: '100%',
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: '100%',
    },
  ];
  return (
    <div className="liquidGuage">
      <LiquidFillGauge
        style={{ margin: '0 auto' }}
        width={props.width}
        height={props.height}
        value={gaugeVal}
        riseAnimationTime={3000}
        textOffsetX={0}
        textOffsetY={0}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={2}
        gradient
        gradientStops={gradientStops}
        circleStyle={{ fill: fillColor }}
        waveStyle={{ fill: fillColor }}
        textStyle={{ fill: 'rgb(255, 255, 255)' }}
        waveTextStyle={{ fill: 'rgb(255, 255, 255)' }}
        // onClick={() => {
        //   this.setState({ value: Math.random() * 100 });
        // }}
      />
      <br></br>
      <p className="loading-center">{props.label}</p>
    </div>
  );
};

export default LiquidGauge;
