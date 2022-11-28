import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useWindowDimensions, View} from 'react-native';
import { Header } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FestivalList from './FestivalList';
import FestivalCarrousel from './FestivalCarrousel';
import FestivalMap from './FestivalMap';
import Notifications from './Notifications';
import About from './About';
import Profil from './Profil';
import HeaderLeftComponent from './HeaderLeftComponent';
import HeaderRightComponent from './HeaderRightComponent';
import {FavorisService} from "../firebase_services/FavorisService";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import {FestivalService} from "../firebase_services/ServiceFestival";
import Filter from "./Filter";
import CustomDrawer from './CustomDrawer';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage({navigation}) {
	return (
		<View style={{flex: 1}}>
			<Drawer.Navigator 
				drawerContent={props => <CustomDrawer {...props} />} 
				screenOptions={{headerShown: false, swipeEnabled: false}}
			>
				<Drawer.Screen name="Accueil" component={TabPage} />
				<Drawer.Screen name="Profil" component={ProfilDrawer} />
				<Drawer.Screen name="Notifications" component={NotificationsDrawer} />
				<Drawer.Screen name="A propos" component={AboutDrawer} />
			</Drawer.Navigator>
		</View>
	);
}

function NotificationsDrawer({ navigation }) {
	return (
		<View>
			<Header
				leftComponent={<HeaderLeftComponent navigation={navigation} />}
				containerStyle={{
					backgroundColor: '#008ad9',
				}}
			/>
			<Notifications navigation={navigation} />
		</View>
	)
}

function AboutDrawer({ navigation }) {
	return (
		<View>
			<Header
				leftComponent={<HeaderLeftComponent navigation={navigation} />}
				containerStyle={{
					backgroundColor: '#008ad9',
				}}
			/>
			<About navigation={navigation} />
		</View>
	)
}

function ProfilDrawer({ navigation }) {
	return (
		<View>
			<Header
				leftComponent={<HeaderLeftComponent navigation={navigation} />}
				containerStyle={{
					backgroundColor: '#008ad9',
				}}
			/>
			<Profil navigation={navigation} />
		</View>
	)
}

function TabPage({ navigation }) {
	const [festivalsPictures, setFestivalsPictures] = useState([]);
    const [festivals, setFestivals] = useState([]);
	const [favoriteFestivals, setFavoriteFestivals] = useState([{identifiant: "0"}]);
    const [filterType,setFilterType] = useState("none")
    const [filterKeyword, setFilterKeyword] = useState("")
	const layout = useWindowDimensions();
	const [isLoading, setLoading] = useState(false);
  	const [allLoaded, setAllLoaded] = useState(false);
	const [lastQueryDoc, setLastQueryDoc] = useState();
    const nbPerQuery = 15;

	const getData = async () => {
		try {
			const data = require('../festivalsPictures.json');
			setFestivalsPictures(data)
		} catch (error) {
			console.error(error);
		}
	}

    const setNewFilter = async (type, keyword) => {
        setAllLoaded(false)
		setFilterType(type)
        setFilterKeyword(keyword)
        loadFestivals(type, keyword, true)
    }

	const loadFestivals = async (type, keyword, newFilter) => {
		if (isLoading || (allLoaded && !newFilter)) return;
		setLoading(true);	
			
		// fetch next entries
		// use the props instead of the state if new filter (Filter component callback is causing late update of the filter's state)
		const usedType = (newFilter ? type : filterType);
		const usedKeyword = (newFilter ? keyword : filterKeyword);
		const last = (newFilter ? undefined : lastQueryDoc);
		let newEntries
		let festivalPromise
		if(usedKeyword === ""){
			festivalPromise = FestivalService.getFestivalsLimitsPromise(nbPerQuery, last)
		}
		else if(usedType === "town"){
			festivalPromise = FestivalService.getFestivalsFilterTownLimits(usedKeyword, nbPerQuery, last)
		}
		else if(usedType === "mainEvent"){
			festivalPromise = FestivalService.getFestivalsFilterMainActivityLimits(usedKeyword, nbPerQuery, last)
		}
		else if(usedType === "titre"){
			festivalPromise = FestivalService.getFestivalsFilterTitleLimits(usedKeyword, nbPerQuery, last)
		}
		await festivalPromise
			.then((query) => {
				newEntries = query.docs.map((doc) => doc.data());
				if (newFilter) {
					setFestivals(newEntries);
				} else {
					setFestivals(festivals.concat(newEntries));
				}
				setLastQueryDoc(query.docs[query.docs.length - 1]);
			})
			.catch((error) => {
				console.error("festivalPromise in loadFestivals did not work" + error)
				throw error;
			});
		
		// if no new items, prevent further requests
		if (newEntries.length === 0) {
			setAllLoaded(true);
		}
		setLoading(false);
	}
	

    useEffect(() => {
		getData();
		loadFestivals("town","",true);
		reloadFavorites()
	}, []);


	const reloadFavorites = () => {
		FavorisService.getAllFavoriteFestivals()
			.then((favorites) => {
				AsyncStorage.setItem("@favorites_ids",JSON.stringify(favorites.map((item) => item.identifiant)))
				setFavoriteFestivals(favorites)
			})
	}

	const switchFavorite = (favoriteItem) => {
		const filteredFestivals = favoriteFestivals.filter((item) => item.identifiant !== favoriteItem.identifiant)
		if(filteredFestivals.length !== favoriteFestivals.length){
			AsyncStorage.setItem("@favorites_ids",JSON.stringify(filteredFestivals.map((item) => item.identifiant)))
			setFavoriteFestivals(filteredFestivals)
		}
		else{
			const newFilteredFestivals = filteredFestivals.concat([favoriteItem])
			AsyncStorage.setItem("@favorites_ids",JSON.stringify(newFilteredFestivals.map((item) => item.identifiant)))
			setFavoriteFestivals(newFilteredFestivals)
		}

	}

	return (
		<View style={{flex: 1}}>
			<Header
				leftComponent={<HeaderLeftComponent navigation={navigation} />}
				rightComponent={<HeaderRightComponent navigation={navigation} />}
				containerStyle={{
					backgroundColor: '#008ad9',
				}}
			/>
			<Tab.Navigator initialRouteName="Festivals" screenOptions={{ headerShown: false , tabBarStyle: { backgroundColor: '#008ad9'} ,tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'white', tabBarItemStyle: { }}}>
				<Tab.Screen
					name="Festivals"
					options={{
						tabBarLabel: 'Festivals',
						tabBarLabelStyle: { fontSize: 15, fontWeight: "bold", top: 10 },
						tabBarIcon: () => (
							<Ionicons
								name="body-outline"
								color="white"
								size={26}
							/>
						),
						tabBarIconStyle: { top: 8 },
					}}
					children={() => {
						return <View>
							<FestivalCarrousel navigation={navigation} festivals={festivals} festivalsPictures={festivalsPictures}/>
							<Filter callbackOnRequest={setNewFilter}/>
							<FestivalList festivals={festivals}
										  favoriteIds={favoriteFestivals.map((festival) => festival.identifiant)}
										  switchFavoriteCallback={switchFavorite}
										  navigation={navigation}
										  loadMoreResults={loadFestivals}
										  isLoading={isLoading}/>
						</View>
					}}/>
				<Tab.Screen
					name="Favoris"
					options={{
						tabBarLabel: 'Favoris',
						tabBarLabelStyle: { fontSize: 15, fontWeight: "bold", top: 10 },
						tabBarIcon: () => (
							<Ionicons
								name="heart-outline"
								color="white"
								size={25}
							/>
						),
						tabBarIconStyle: { top: 8 },
					}}
					children={() => {
						return <View>
							<FestivalList festivals={favoriteFestivals}
										  favoriteIds={favoriteFestivals.map((festival) => festival.identifiant)}
										  switchFavoriteCallback={switchFavorite}
										  navigation={navigation}
										  isFavorites={true}/>

						</View>
					}}/>
				<Tab.Screen
					name="Carte"
					options={{
						tabBarLabel: 'Carte',
						tabBarLabelStyle: {fontSize: 15, fontWeight: "bold", top: 10},
						tabBarIcon: () => (
							<Ionicons
								name="map-outline"
								color="white"
								size={23}
							/>
						),
						tabBarIconStyle: { top: 8 },
					}}
					children={() =>
						<FestivalMap festivals={festivals} navigation={navigation} />
					}/>
			</Tab.Navigator>

		</View>

	);
}
