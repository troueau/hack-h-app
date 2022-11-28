import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import style from '../Style';
import {FestivalService} from "../firebase_services/ServiceFestival";

export default function FestivalCarousel({ navigation, festivals, festivalsPictures }) {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);

  function selectItem(name) {
    FestivalService.getFestivalByName(name)
    .then((value) => navigation.navigate("FestivalDetails", { festival: value.docs[0].data()}))
    .catch((error) => console.error(error))
  }

  useEffect(() => {
    const firstNumberTemp = Math.floor(Math.random() * 30) + 1;
		setFirstNumber(firstNumberTemp);
    setSecondNumber(firstNumberTemp+3);
	}, []);

	return (
    <SafeAreaView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {festivalsPictures.slice(firstNumber, secondNumber).map((item) => (
          <TouchableOpacity key={item.nom_du_festival} onPress={() => selectItem(item.nom_du_festival)}>
            <View style={style.shapeCarrousel} >
            <ImageBackground source={{uri: item.uri_photo}}
              style={style.imageCarrousel} imageStyle={{opacity: .7}}>
                <View style={style.footerCarrousel}>
                  <Text includeFontPadding={false} style={style.textCarrousel}>{item.nom_du_festival}</Text>
                </View>
            </ImageBackground>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
