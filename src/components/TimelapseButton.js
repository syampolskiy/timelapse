import React, {Component} from 'react';
import Svg,{
    Circle,
    G
} from 'react-native-svg';
import {View, TouchableOpacity, Text, Animated, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Bar from './bar';

EStyleSheet.build();

class TimelapseButton extends Component{
  constructor(props) {
    super(props);

    this.diameter = 50;
    this.radius = this.diameter / 2;
    this.strokeDasharray = 2 * Math.PI * this.radius;
    this.strokeDashoffset = this.strokeDasharray;
    this.state = {
        startStopTimer: 0,
        progress: new Animated.Value(this.strokeDashoffset),
        roundHasBeenFinished: 0
    };
  }

  countTime = () => {
    if (this.state.startStopTimer){
      // stop timer
      this.setState({
        startStopTimer: 0,
        progress: new Animated.Value(this.strokeDashoffset),
        roundHasBeenFinished: 0
      });
    } else{
      var self = this;
      // start timer
      this.setState({
        startStopTimer: 1,
        progress: new Animated.Value(this.strokeDashoffset),
        roundHasBeenFinished: 0
      });

      Animated.timing(this.state.progress, {
        toValue: 40,
        duration: this.props.seconds*1000
      }).start(function(){
        console.log(self.state.progress)
      });

    }
  };

  componentDidMount() {
    var self = this;
    Animated.timing(self.state.progress, {
        toValue: 50,
        duration: self.props.seconds*1000
      }).start(function(){
        console.log(self.state.progress)
        console.log(self.state.progress._value)
      });
  }

  render(){
    const rotate = "-90";
    const progressWidth = 3;
    const width = this.diameter + progressWidth;
    const circleCenterPosition = width / 2;
    const strokeDashoffset = this.strokeDasharray;

    const transform = {
        translate: `${circleCenterPosition},${circleCenterPosition}`, rotate: `${rotate}`
      };

    return (
       <Animated.View style={{backgroundColor: 'grey'}}>
         <TouchableOpacity onPress={this.props.seconds ? () => this.countTime() : () => this.countTime()} style={[styles2.buttonStyles]}>
            <Svg style={[styles2.buttonStyles]}>
              <G transform={transform}>
                <Circle cx={0} cy={0} r={this.radius} fill="none" stroke={this.state.roundHasBeenFinished ? '#FFF' : 'green'} strokeWidth={progressWidth} />
                <Circle cx={0} cy={0} r={this.radius-5} fill="#fff" />
                <Circle cx={0} cy={0} r={this.radius} fill="none" stroke="#E62B08" strokeWidth={progressWidth} strokeDasharray={"" + this.strokeDasharray} strokeDashoffset={"" + this.state.progress._value}/>
                </G>
            </Svg>
         </TouchableOpacity>
                <Text style={{color: "#000"}}>{this.state.progress._value}</Text>
       </Animated.View>
            // <Bar value={120}/>
    )
  }
}

const styles2 = EStyleSheet.create({
  buttonStyles: {
    width: 53,
    height: 53,
    borderRadius: 53
  },
  '@media (min-width: 1024)': {
    buttonStyles: {
      width: 89,
      height: 89,
      borderRadius: 89
    }
  }
});

export default TimelapseButton;
