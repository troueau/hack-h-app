import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import style from '../Style';

export default function About({ navigation }) {
	return (
		<View style={style.containerAbout+{flex:1}}>
			<Text style={style.titleAbout}>HACKATHON 2022</Text>
			<Text style={style.subTitleAbout}>Projet Hackathon 2022, Master 2 IL - CCN.</Text>
			<Text style={style.specialTextAbout}>Qui sommes nous ?</Text>
			<Text style={style.textAbout}>STEPHAN Mathys, ROUSSEAU Tom, TOUATI Inès, LQATI Brahim, BEAUGAS Charly, FAVEREAU Harold.</Text>
            <Text style={style.textAbout}>Groupe H</Text>
			<ImageBackground
				style={style.imageAbout}
				source={require("../assets/hackathon.png")}
			></ImageBackground>
		</View>
	)
}