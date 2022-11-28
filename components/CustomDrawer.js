import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fff', flex: 1, top: 60, backgroundColor: '#fff'}}>
          <Image
          source={require('../assets/culture-illustration.jpg')}
          style={{width: '100%', height: 150, resizeMode: 'cover', bottom:40}}/>
          <DrawerItemList {...props} />
          <Text style={{textAlign:"center", top: 430}}>feur</Text>
      </DrawerContentScrollView>
      <View style={{flex: 0.1, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <Image 
          source={require('../assets/logo-data-gouv-fr.png')}
          style={{width: 60, resizeMode:'contain', flex:1, left: "39%"}}/>
      </View>
    </View>
  );
};

export default CustomDrawer;