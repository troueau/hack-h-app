import React from 'react';
import { View, Text } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import style from '../Style';
import { getEmail } from '../firebase_services/AuthentificationService';


export default function Profil({navigation}) {
    const email = getEmail();

    return (
		<View style={style.container + {flex: 1}}>
			<Icon
                name="person-circle-outline"
                color="black"
                size={120}
                style={style.logo}
            />
            <Text style={{
                    margin:8,
                    borderWidth:2,
                    borderRadius:10,
                    padding:10,
                    alignSelf: "center"
                }}>E-mail : {email}</Text>
        </View>
	)
}