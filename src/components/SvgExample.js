import React, {Component} from 'react';
import Svg,{
    Circle,
    G
} from 'react-native-svg';
import {Animated, View, Text, TouchableOpacity} from 'react-native';

class SvgExample extends Component{
	render(){
		const rotate = "-90";
		const diameter = 120;
		const progressWidth = 6;
		const width = diameter + progressWidth;
		const circleCenterPosition = width / 2;
		const radius = diameter / 2;
		const strokeDasharray = 2 * Math.PI * radius;
		const strokeDashoffset = strokeDasharray - 115;

		const transform = {
	      translate: `${circleCenterPosition},${circleCenterPosition}`, rotate: `${rotate}`
	    };

		return(
			<TouchableOpacity>
				<Svg width={width} height={width} onPress="">
					<G transform={transform}>
						<Circle cx={0} cy={0} r={radius} fill="none" stroke="#e6e6e6" strokeWidth={progressWidth} />
						<Circle cx={0} cy={0} r={radius-10} fill="red" />
	        			<Circle cx={0} cy={0} r={radius} fill="none" stroke="#f77a52" strokeWidth={progressWidth} strokeDasharray={"" + strokeDasharray} strokeDashoffset={"" + strokeDashoffset}/>
        			</G>
				</Svg>
			</TouchableOpacity>
		)
	}
}

export default SvgExample;