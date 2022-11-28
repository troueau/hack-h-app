import React, { useState } from 'react';

import { SafeAreaView, TextInput, View, Button, TouchableOpacity, Text} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import style from '../Style';
import { signIn } from '../firebase_services/AuthentificationService';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Icon
            style={style.logo}
            name="logo-react"
            color="#007AFF"
            size={50}
        />
        <TextInput
            style={style.input}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="E-mail"
            placeholderTextColor="#003f5c"
        />
        <TextInput
            style={style.input}
            placeholder="Mot de passe"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={style.button} onPress={() => signIn(email, password, navigation)}>
            <Text style={style.appButtonText}>Connexion</Text>
        </TouchableOpacity>
      </View>
      <View style={style.bottomContainer}>
        <Button
            title="Créer un compte"
            onPress={() => navigation.navigate("Auth")}
        />
      </View>
  </SafeAreaView>
  );
}