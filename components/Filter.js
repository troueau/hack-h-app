import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { SearchBar } from "react-native-elements";
import { Icon } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';
import style from '../Style'

export default function Filter(props){
    const [keyword, setKeyword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchType, setSearchType] = useState("titre");

    const setNewFilter = props.callbackOnRequest;

    const setNewSearch = () => {
        setNewFilter(searchType,keyword);
    }

    return <View style={style.containerFilter}>
        <View style={style.searchbar}>
            <SearchBar
                placeholder="Rechercher..."
                onChangeText={(keyword) => setKeyword(keyword)}
                value={keyword}
                inputStyle={style.searchInput}
                autoCorrect={false}
                lightTheme
                round
                containerStyle={{backgroundColor:"#F2F2F2", borderTopWidth:0, borderBottomWidth:0, left:10}}
                onSubmitEditing={setNewSearch}
                onClear={() => setNewFilter(searchType,"")}
            />
        </View>
        <View style={{flex: 1}}>
            <Icon
                name='filter'
                type='font-awesome'
                color='black'
                onPress={() => setModalVisible(true)} />
        </View>
        <View>
            <Modal
                transparent={true}
                visible={modalVisible}
                style={style.modalView}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            ><TouchableOpacity
                style={style.outsideModalContent}
                activeOpacity={0.2}
                onPressOut={() => {setModalVisible(false)}}
            >
            <TouchableWithoutFeedback>
                <View style={style.modalContent}>
                    <Text style={style.titleRadioGroup}>Filtre</Text>
                    <RadioButton.Group onValueChange={(type) => setSearchType(type)} value={searchType}>
                        <View style={style.radioButtonView}>
                            <RadioButton value="titre"/>
                            <Text>Titre</Text>
                        </View>
                        <View style={style.radioButtonView}>
                            <RadioButton value="town"/>
                            <Text>Ville</Text>
                        </View>
                        <View style={style.radioButtonView}>
                            <RadioButton value="mainEvent" />
                            <Text>Discipline principale</Text>
                        </View>
                    </RadioButton.Group>
                </View>
            </TouchableWithoutFeedback>
            </TouchableOpacity>
            </Modal>
        </View>


    </View>;
}
