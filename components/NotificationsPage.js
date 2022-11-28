import React from 'react';
import { Text, View } from 'react-native';

export default function NotificationsPage({route}) {
    const { notification } = route.params;
	return (
		<View>
			<Text >{notification.message}</Text>
		</View>
	)
}
