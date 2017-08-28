import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

export default class Cirlce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProgress: 0
    };
  }

  componentDidMount() {
    const targetProgress = 1;
    this._animate(targetProgress);
  }

  _animate = (_targetProgress) => {
    const targetProgress = Math.max(0, _targetProgress);
    if (targetProgress === 0) {
      this.setState({ currentProgress: 0 });
      return;
    }
    const {
      animateStep,
      animateDuration,
      onAnimateUpdate,
      onAnimateCompleted
    } = {
      animateStep: 0.005,
      animateDuration: 100,
      onAnimateUpdate: () => {},
      onAnimateCompleted: () => {}

    };
    if (this._intervalId) this._intervalId = clearInterval(this._intervalId);
    if (animateDuration > 0 && animateStep > 0) {
      this.setState({ currentProgress: 0 });
      const numberOfAnimates = Math.ceil(targetProgress / animateStep);
      const intervalMilliseconds = Math.round(animateDuration / numberOfAnimates);
      this._intervalId = setInterval(() => {
        this._updateProgressByStep(animateStep, targetProgress, onAnimateUpdate, onAnimateCompleted);
      }, intervalMilliseconds);
    } else {
      this.setState({ currentProgress: targetProgress });
    }
  };

  _updateProgressByStep = (animateStep, targetProgress, onUpdate, onCompleted) => {
    const { currentProgress } = this.state;
    let nextProgress = Math.min(currentProgress + animateStep, targetProgress);
    if (nextProgress === targetProgress) {
      clearInterval(this._intervalId);
    }
    this.setState({ currentProgress: nextProgress }, () => {
      onUpdate(nextProgress);
      if (nextProgress === targetProgress) onCompleted();
    });
  };

  render() {
    const diameter = 200;
    const clockwise = true;
    const maxProgress = 1;
    const progressPadding = 0;
    const progressWidth = 6;
    const backgroundColor = '#cecece';
    const color = 'green';
    const rotate =  -90;
    const lineCap = 'round';
    const { currentProgress } = this.state;

    const realProgress = currentProgress * maxProgress;
    const width = diameter + progressWidth;
    const progressDiameter = (diameter - progressPadding);
    const radius = progressDiameter / 2;

    const bgDashArray = Math.PI * progressDiameter;
    const maxProgressBasedOnDirection = clockwise ? (1 - maxProgress) : (1 + maxProgress);
    const bgDashOffset = bgDashArray * maxProgressBasedOnDirection;

    const progressDashArray = Math.PI * progressDiameter;
    const percentValue2BasedOnDirection = clockwise ? (1 - realProgress) : (1 + realProgress);
    const progressDashOffset = progressDashArray * percentValue2BasedOnDirection;
    const circleCenterPosition = width / 2;

    const transform = {
      translate: `${circleCenterPosition},${circleCenterPosition}`, rotate: `${rotate}`
    };
    return (
      <Svg width={width} height={width}>
        <G transform={transform}>
          <Circle
            r={radius}
            fill={'none'}
            stroke={backgroundColor}
            strokeWidth={progressWidth}
            strokeLinecap={lineCap}
            strokeDasharray={[bgDashArray]}
            strokeDashoffset={bgDashOffset}
          />
          <Circle
            r={radius}
            fill={'none'}
            stroke={color}
            strokeWidth={progressWidth - progressPadding}
            strokeLinecap={lineCap}
            strokeDasharray={[progressDashArray]}
            strokeDashoffset={progressDashOffset}
          />
        </G>
      </Svg>
    );
  }
}