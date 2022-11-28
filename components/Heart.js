import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import style from '../Style';

export default function Heart({isLiked, onLike}) {
	return (
		<TouchableOpacity style={{paddingLeft:10}} onPress={(onLike)}>
			{isLiked ? 
				<Icon
					name="heart"
					size={20}
					color="red"
					style={[style.heart, style.heartFilled]}
				/>
			:
				<Icon
					name="heart-outline"
					size={20}
					style={[style.heart]}
				/>
			}
		</TouchableOpacity>
	);
}