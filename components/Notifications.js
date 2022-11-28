import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import {FavorisService} from "../firebase_services/FavorisService";

export default function Notifications({ navigation }) {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		navigation.addListener("drawerItemPress", (e) => FavorisService.getAllNotificationsFromUser().then((value) => {
			setNotifications(value)
		}))
	}, [navigation]);


	return (
		<SafeAreaView>
			<ScrollView>
				{notifications.map((item) => (
					<TouchableOpacity key={item.uid} style={{marginVertical:10, borderWidth:1, borderRadius: 10, padding: 10}} onPress={() => {navigation.navigate('NotificationsPage', {notification: item})}}>
						<Text>{item.title}</Text>
					</TouchableOpacity>
				))
				}
			</ScrollView>
		</SafeAreaView>
	)
}