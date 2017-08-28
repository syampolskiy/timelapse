import React, {Component} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

class Bar extends Component{
	constructor(props) {
	    super(props);

	    this._width = new Animated.Value(0); // Added
	  }

	  componentDidMount() {
	    const { value } = this.props;
	    Animated.timing(this._width, {
	      toValue: value,
	      duration: 5000
	    }).start();
	  }

	  render() {
	    const barStyles = {
	    	backgroundColor: 'green',
	      height: 40,
	      width: this._width
	    };

	    return (
	      <Animated.View style={barStyles} />
	    );
	  }
}

export default Bar;