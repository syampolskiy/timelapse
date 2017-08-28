import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import TimelapseButton from './src/components/TimelapseButton';

class App extends Component {
    render(){
    	return (
    		<View style={{backgroundColor: '#000'}}>
    			<TimelapseButton seconds={5} functionToSendSignal={'timeIsOver'} />
    		</View>
    	);
    }
};

AppRegistry.registerComponent('timelapse', () => App);
