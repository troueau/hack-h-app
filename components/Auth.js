import React, { useState } from 'react';

import { SafeAreaView, TextInput, View, Button, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import style from '../Style';
import { createAccount } from '../firebase_services/AuthentificationService';

export default function Auth({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
          keyboardType="email-address"
          autoCorrect={false}
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
        <TextInput
          style={style.input}
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        />
        <TouchableOpacity style={style.button} onPress={() => createAccount(email, password, confirmPassword, navigation)}>
            <Text style={style.appButtonText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
      <View style={style.bottomContainer}>
        <Text>Déjà enregistré ?</Text>
        <Button
          title="Connectez vous"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
  </SafeAreaView>
  );
}