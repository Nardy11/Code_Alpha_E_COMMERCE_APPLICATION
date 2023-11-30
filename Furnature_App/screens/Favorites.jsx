import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/index";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SearchTile from "../components/products/SearchTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./search.style";

const Favorite = () => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [Result, setResult] = useState([]);
  const [useId, setUseId] = useState(null); 

  useEffect(() => {
    checkExistingUser();
  }, []);
  
  useEffect(() => {
    if (useId !== null) {
      showFavorite();
    }
  }, [useId]);
  
  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentuser = await AsyncStorage.getItem(userId);
      console.log('Current User:', currentuser);
      if (currentuser !== null) {
        const parsedData = JSON.parse(currentuser);
        setUserData(parsedData);
        setUserLogin(true);
        setUseId(userId.substring(4));
      }
    } catch (err) {
      console.log('error', err);
    }
  };
  
  const showFavorite = async () => {
    console.log('Fetching favorites for user ID:', useId);
    try {
      const response = await axios.get(`http://10.0.2.2:3000/api/favorite/getFav/${useId}`);
      console.log('Favorites:', response.data);
      setResult(response.data);
    } catch (err) {
      console.log('error', err);
    }
  };
  
  
  return (
    <SafeAreaView>
      <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>
                    My Favorite List
                </Text>
      {Result.length===0?(
        <View style={{flex:1}}>
          <Image source={require('../assets/images/Pose23.png')} style={styles.searchImage}/>
          </View>
      ):(
        <FlatList 
        data={Result}
        keyExtractor={(item)=>item._id}
        renderItem={({item})=>(<SearchTile item={item.productId}  /> )}
        style={{marginHorizontal:12}}
        />
      )}
    </SafeAreaView>
  );
};

export default Favorite;
