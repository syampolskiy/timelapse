import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import ProgressCircle from 'react-native-progress-circle';
import SvgExample from './SvgExample';

EStyleSheet.build();

class TimelapseButton extends Component{
  constructor(props) {
    super(props);

    this.interval = null;

    this.state = {
        startStopTimer: 0,
        percent: 0,
        roundHasBeenFinished: 0
    };
  }

  countTime = () => {
    if (this.state.startStopTimer){
      // stop timer
      clearInterval(this.interval);
      this.setState({
        startStopTimer: 0,
        percent: 0,
        roundHasBeenFinished: 0
      });

    } else{
      // start timer
      let self = this;

      self.setState({
        startStopTimer: 1,
        percent: 0,
        roundHasBeenFinished: 0
      });

      let step = 100 / this.props.time;
      self.interval = setInterval(function(){
        if (self.state.percent == 100){
            self.setState({
              percent: 0,
              roundHasBeenFinished: !self.state.roundHasBeenFinished
            });
        }
        let newPercent = self.state.percent + step;
        if (newPercent >= 100){
          self.setState({
            percent: 100
          });
        } else{
          self.setState({
            percent: newPercent
          });
        }
      }, 1000);

    }
  };

  render(){
    return (
       <View>
          <SvgExample/>
       </View>

       // <ProgressCircle
       //      percent={this.state.percent}
       //      radius={30}
       //      borderWidth={1}
       //      color={this.state.roundHasBeenFinished ? "#fff" : '#E62B08'}
       //      shadowColor={this.state.roundHasBeenFinished ? "#E62B08" : '#fff'}
       //      bgColor="rgb(28, 42, 57)"
       //  >
       //      <TouchableOpacity onPress={this.props.time ? () => this.countTime() : () => this.countTime()} style={[styles.buttonStyles, { padding: 5, backgroundColor: this.state.startStopTimer ? '#E62B08' : '#FFF' }]} />
       //  </ProgressCircle>
    )
  }
}

// const styles2 = StyleSheet.create({
//   outerCircle: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#e3e3e3',
//   },
//   innerCircle: {
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   leftWrap: {
//     position: 'absolute',
//     top: 0,
//   },
//   halfCircle: {
//     position: 'absolute',
//     top: 0,
//     borderTopRightRadius: 0,
//     borderBottomRightRadius: 0,
//     backgroundColor: '#f00',
//   },
// })

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
})

const styles = EStyleSheet.create({
  container: {
    width: '11.56%',
    backgroundColor: 'rgba(28, 42, 57, .7)',
    paddingTop: 5,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modeContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 5
  },
  buttonContainerStyles: {
    padding: 1,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
    // marginTop: 30,
    // marginBottom: 20
  },
  buttonStyles: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  buttonPlayStyles: {
    marginBottom: 25,
    padding: 5
  },
  switchContainer: {
    width: '100%',
    alignItems: 'center'
  },
  '@media (min-width: 1024)': {
    container: {
      paddingTop: 20,
      paddingBottom: 15
    },
    buttonContainerStyles: {
      width: 100,
      height: 100,
      borderRadius: 100
    },
    buttonStyles: {
      width: 86,
      height: 86,
      borderRadius: 86
    },
  }
});

export default TimelapseButton;
