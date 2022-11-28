import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

import Auth from './components/Auth';
import Login from './components/Login';
import HomePage from './components/HomePage';
import FestivalDetails from './components/FestivalDetails';
import NotificationsPage from './components/NotificationsPage';

const Stack = createNativeStackNavigator();

export default function MainStackApp () {
  LogBox.ignoreAllLogs();

  return (
      <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen
                  name="Login"
                  component={Login}
              />
              <Stack.Screen
                  name="HomePage"
                  component={HomePage}
              />
              <Stack.Screen
                  name="Auth"
                  component={Auth}
              />
              <Stack.Screen
                  name="FestivalDetails"
                  component={FestivalDetails}
                  options={{headerShown: true , title:"Détails"}}
              />
              <Stack.Screen
                  name="NotificationsPage"
                  component={NotificationsPage}
                  options={{headerShown: true , title:"Notifications"}}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
};