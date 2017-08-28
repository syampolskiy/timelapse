import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Circle from './Circle';
import Bar from './bar';

EStyleSheet.build();

class TimelapseButton extends Component{
  constructor(props) {
    super(props);
  }

  countTime = () => {
    if (this.state.startStopTimer){
      // stop timer
      
    } else{
      // start timer
      
    }
  };

  render(){
    return (
      <View>
        <Circle/>
      </View>

       // <View style={{backgroundColor: 'grey'}}>
       //   <TouchableOpacity onPress={this.props.seconds ? () => this.countTime() : () => this.countTime()} style={[styles2.buttonStyles]}>
       //      <Svg style={[styles2.buttonStyles]}>
       //        <G transform={transform}>
       //          <Circle cx={0} cy={0} r={this.radius} fill="none" stroke={this.state.roundHasBeenFinished ? '#FFF' : 'green'} strokeWidth={progressWidth} />
       //          <Circle cx={0} cy={0} r={this.radius-5} fill="#fff" />
       //          <Circle cx={0} cy={0} r={this.radius} fill="none" stroke="#E62B08" strokeWidth={progressWidth} strokeDasharray={"" + this.strokeDasharray} strokeDashoffset={"" + this.state.progress._value}/>
       //          </G>
       //      </Svg>
       //   </TouchableOpacity>
       // </View>
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