import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { signUserOut } from '../firebase_services/AuthentificationService';

function twoOptionsAlertFunction(navigation){
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        {text: 'Oui', onPress: () => signUserOut(navigation)},
        {text: 'Non', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    );
}

export default function HeaderRightComponent({navigation}) {
	return (
        <TouchableOpacity onPress={() => twoOptionsAlertFunction(navigation)}>
            <Icon
                name="log-out-outline"
                color="white"
                size={28}
                style={{right: 10}}
            />
        </TouchableOpacity>
    );
}
