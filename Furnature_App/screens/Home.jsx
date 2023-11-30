import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import {Ionicons,Fontisto} from '@expo/vector-icons';
import { Welcoming  } from '../components';
import Carousel from '../components/homepage/Carousel1';
import Heading from "../components/homepage/Heading"
import ProductRow from '../components/products/ProductRow';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const [userData,setUserData]=useState(null);
  const [userLogin,setUserLogin]=useState(null);
  const navigation = useNavigation();

  useEffect(()=>{
    checkExistingUser();
  },[])
  const checkExistingUser =async ()=>{

    const id =await AsyncStorage.getItem('id');
    const useId =`user${JSON.parse(id)}`;
    try{
      const currentuser=await AsyncStorage.getItem(useId);
    if(currentuser!==null){
      const pasrsedData =JSON.parse(currentuser)
      setUserData(pasrsedData)
      setUserLogin(true)
    }
  }catch(err){
    console.log('error',err);
  }
}
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
      <View style={styles.appBar}>
        <Ionicons name='location-outline' size={24}/>
        <Text style={styles.location}>{userData?userData.location:"Egypt"}</Text>
        <View style={{alignItems:"flex-end"}}>
          <View style={styles.cartCount}>
          <Text style={styles.cartNumber} onPress={()=>navigation.replace("Cart")} >8</Text>
            </View>
            <View>
              <TouchableOpacity>
              <Fontisto name='shopping-bag' size={24}/>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
      <ScrollView>
        <Welcoming />
        <Carousel  />
        <Heading   />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
