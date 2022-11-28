import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default function HeaderLeftComponent({navigation}) {
	return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon
                name="menu-outline"
                color="white"
                size={30}
                style={{left: 10}}
            />
        </TouchableOpacity>
    );
}