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
  }

  countTime = () => {
      // this.setState({
      //   progress: new Animated.Value(0)
      // });
     Animated.timing(this.state.progress, {
        toValue: 100,
        duration: 5000
     }).start(function(){
        this.setState({
          progress: new Animated.Value(0),
          timelapseColor: !this.state.timelapseColor
        });
        // this.countTime();
     });
  }

  render() {
    const AnimatedTmlpsBtnWrapper = Animated.createAnimatedComponent(TmlpsBtnWrapper);
    return (
        <View style={ styles.containerTmlps }>
          <AnimatedTmlpsBtnWrapper series={this.state.progress} strokeWidth={1} radius={30} strokeColor={this.state.timelapseColor ? '#E62B08' : '#fff'} strokeBackground={this.state.timelapseColor == 1 ? '#fff' : '#E62B08'}>
            <TouchableOpacity
              onPress={this.countTime} style={[styles.buttonTmlpsStyles, {backgroundColor: '#fff'}]}
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
    // width: '11.56%',
    backgroundColor: 'rgba(28, 42, 57, .7)',
    paddingTop: 5,
    paddingBottom: 10,
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center'
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