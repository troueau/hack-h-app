import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Text, FlatList, View, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-paper'

import style from '../Style';
import {FavorisService} from "../firebase_services/FavorisService";
import Heart from './Heart';

const FestivalListItem = ({festival, favoriteIds, switchFavoriteCallback, navigation, loadMoreResults}) => {
  const [isFavoriteItem, setFavoriteItem] = useState(false);

  useEffect(() => {
    setFavoriteItem(favoriteIds.includes(festival.identifiant))
  }, [favoriteIds]);


  const getInitials = (name) => {
    if (!name) return ''
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    let initials = [...name.matchAll(rgx)] || [];
    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }

  const onLike = () => {
    if(isFavoriteItem){
      FavorisService.removeFavoriFromUser(festival.identifiant)
    }
    else{
      FavorisService.addFavoriToUser(festival.identifiant)
    }
    setFavoriteItem(!isFavoriteItem)
    switchFavoriteCallback(festival)
  }

  return (
      <View style={style.listItem}>
        <TouchableOpacity style={style.row}
                          onPress={() => {navigation.navigate('FestivalDetails', {festival: festival, onLike: onLike, isFavoriteItem: isFavoriteItem})}}
        >
          <Avatar.Text 
            style={style.picture} 
            size={40} color="black" 
            label={getInitials(festival.nom_du_festival)}
          />
          <View>
            <Text style={style.primaryText}>{festival.nom_du_festival}</Text>
            <Text style={style.secondaryText}>{festival.commune_principale_de_deroulement}</Text>
          </View>
        </TouchableOpacity>
        <Heart isLiked={isFavoriteItem} onLike={onLike} />
      </View>

  );
}

export default function FestivalList({ festivals, favoriteIds, switchFavoriteCallback, navigation, loadMoreResults, isLoading, isFavorites}) {
  const [tfavoriteIds, setFavoriteIds] = useState([])

  useEffect(() => {
    setFavoriteIds(favoriteIds)
  }, [favoriteIds]);

  return (
    <FlatList
      data={festivals}
      style={{marginBottom: "70%"}}
      keyExtractor={(item, index) => index}
      ListFooterComponent={
        !isFavorites && (
          <View>
            {isLoading &&
              <ActivityIndicator/>
            }
          </View>
        ) 
      }
      onEndReachedThreshold={0.01}
      onEndReached={info => {
        if(!isFavorites) {
          try {
            loadMoreResults();
          } catch (error) {
            Alert.alert(`Erreur - Impossible de récupérer les données suivantes`)
          } 
        }
      }}
      renderItem={({ item }) => {
        return ( <FestivalListItem 
          festival={item} 
          favoriteIds={tfavoriteIds}
          switchFavoriteCallback={switchFavoriteCallback}
          navigation={navigation}/> 
        )
      }}
    />
	)
}
