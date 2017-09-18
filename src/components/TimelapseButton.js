import React, {Component} from 'react';
import Svg,{
    Circle,
    G
} from 'react-native-svg';
import {View, TouchableOpacity, Text, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Pie from './Circle';

class TmlpsBtnWrapper extends Component {
  render() {
    var innerRadius = parseFloat(this.props.radius) - parseFloat(this.props.strokeWidth);

    return (
      <View style={styles.containerForPressingBtn}>
        <Pie
          radius={this.props.radius}
          innerRadius={innerRadius}
          series={[this.props.series]}
          colors={[this.props.strokeColor]}
          backgroundColor={this.props.strokeBackground} />
        {this.props.children}
      </View>
    )
  }
}

export default class TimelapseButton extends Component{
  constructor(props) {
    super(props);

    this.state = {
      progress: new Animated.Value(0),
      timelapseColor: true
    }

    this.time = this.props.seconds * 1000;
    this.isAnimating = false;
    this.stopAnimationTriggered = false;
    this.animationTimeoutFunction = null;
  }

  countTime = () => {
    var self = this;
    
    if (!self.isAnimating){
      self.isAnimating = true;

       Animated.timing(self.state.progress, {
          toValue: 100,
          duration: self.time
       }).start();

       self.animationTimeoutFunction = setTimeout(() => {
          self.setState({
            timelapseColor: !self.state.timelapseColor,
            progress: new Animated.Value(0)
          });
          self.isAnimating = false;
          // eval(self.props.functionToSendSignal + '();');
          self.countTime();
       }, self.time);
    } else{
      self.stopTmlpsAnimation();
    }
  }

  stopTmlpsAnimation = () => {
    clearTimeout(this.animationTimeoutFunction);
    this.state.progress.stopAnimation();
    this.setState({
      timelapseColor: true,
      progress: new Animated.Value(0)
    });
    this.isAnimating = false;
  }

  render() {
    const AnimatedTmlpsBtnWrapper = Animated.createAnimatedComponent(TmlpsBtnWrapper);
    return (
        <View style={ styles.containerTmlps }>
          <AnimatedTmlpsBtnWrapper series={this.state.progress} strokeWidth={1} radius={30} strokeColor={this.state.timelapseColor ? '#E62B08' : '#fff'} strokeBackground={this.state.timelapseColor == 1 ? '#fff' : '#E62B08'}>
            <TouchableOpacity
              onPress={this.time ? this.countTime : console.log('old functionality')} style={[styles.buttonTmlpsStyles, {backgroundColor: '#fff'}]}
            />
          </AnimatedTmlpsBtnWrapper>
        </View>

          // <View style={styles.buttonContainerStyles}>
          // </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerTmlps:{
    backgroundColor: 'rgba(28, 42, 57, .7)'
  },
  containerForPressingBtn:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTmlpsStyles: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute'
  },
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
    borderColor: '#FFF',
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


EStyleSheet.build();