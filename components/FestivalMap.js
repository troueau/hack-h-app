import React from 'react';
import MapView from "react-native-map-clustering";
import {Marker} from 'react-native-maps';
import style from '../Style'
import { View, StyleSheet, Dimensions } from 'react-native';

const INITIAL_REGION = {
    latitude: 46.97,
    longitude: 2.40,
    latitudeDelta: 3.5,
    longitudeDelta: 16.5,
};

export default function FestivalMap({ festivals, navigation }) {

    return (
        <View style={style.container}>
            <MapView style={styles.map} initialRegion={INITIAL_REGION}>
                {
                    festivals.filter((item) => 'geolocalisation' in item).map((festival) => <Marker
                        identifier={festival.identifiant}
                        key={festival.identifiant}
                        title = {festival.nom_du_festival}
                        coordinate={{latitude: festival.geolocalisation[0], longitude: festival.geolocalisation[1]}}
                        onCalloutPress={() => {
                            navigation.navigate('FestivalDetails', {festival: festival})
                        }}
                    />)
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
