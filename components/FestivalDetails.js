import React, { useState, useCallback } from 'react';
import { TouchableOpacity, ImageBackground, Linking, Share, Text, View, Alert} from 'react-native';
import email from 'react-native-email';
import Icon from "react-native-vector-icons/Ionicons";
import style from '../Style';

import Heart from './Heart';

export default function FestivalDetails({route}) {
  const [rating, setRating] = useState(0);
  
  const { festival, onLike, isFavoriteItem } = route.params;

  const shareLink = async () => {
    try {
      await Share.share({
        message:
          festival.site_internet_du_festival,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const browseLink = useCallback(async () => {
    const url = festival.site_internet_du_festival;
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`L'url suivante ne peut pas être ouverte: ${url}`);
    }
  }, [() => Alert.alert(`Linking error`)]);

  const sendMail = () => {
    const to = festival.adresse_e_mail
    email(to, {
        subject: 'Information ' + festival.nom_du_festival
    }).catch(console.error)
  }

  return (
  <View>

    <ImageBackground 
      style={style.image}
			source={require("../assets/festival-template.jpg")}
    >
      <View style={style.viewImage}>
        <Text style={style.titleDetails}> {festival.nom_du_festival} </Text>
      </View>
    </ImageBackground>

    <View style={style.scrollView}>
      <View style={style.viewDetail}>
        <TouchableOpacity style={style.buttonDetails} onPress={browseLink}>
          <Icon
            name="globe-outline"
            color="black"
            size={28}
            style={style.logoDetails}
          />
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonDetails} onPress={sendMail}>
          <Icon
            name="mail-outline"
            color="black"
            size={28}
            style={style.logoDetails}
          />
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonDetails} onPress={shareLink}>
          <Icon
            name="share-social-outline"
            color="black"
            size={28}
            style={style.logoDetails}
          />
        </TouchableOpacity>
        <View style={{flex:3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <Heart isLiked={isFavoriteItem} onLike={() => null}/>
        </View>
      </View>

      <View style={style.viewDetail}>
        <Icon
          name="information-outline"
          color="black"
          size={28}
          style={{top:3}}
        />
        <Text style={style.infos}>{festival.discipline_dominante}</Text>
      </View>
      <View style={style.viewDetail}>
        <Icon
          name="calendar-outline"
          color="black"
          size={28}
          style={{top:3}}
        />
        <Text style={style.infos}>{festival.periode_principale_de_deroulement_du_festival}</Text>
      </View>
      <View style={style.viewDetail}>
        <Icon
          name="location-outline"
          color="black"
          size={28}
          style={{top:6}}
        />
        <Text style={style.infos}>{festival.region_principale_de_deroulement}, {festival.departement_principale_de_deroulement}, {festival.commune_principale_de_deroulement} </Text>
      </View>
    </View>
  </View>
  );
};
