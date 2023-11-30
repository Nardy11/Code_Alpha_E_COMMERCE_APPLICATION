import React, { useState } from "react";
import { TouchableOpacity,StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto, Feather } from "@expo/vector-icons";
import { COLORS, SHADOWS, SIZES } from "../../constants/index";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const SearchTile = ({item}) => {
  const navigation = useNavigation();
  return (
    <View>
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate("ProductDetails",{item})}>
         <View style={styles.image}>
         <Image source={{uri:item.imageUrl}} style={styles.productImg}/>
         </View>
         <View style={styles.textContainer}>
         <Text style={styles.ProductTitle}>{item.title}</Text>         
         <Text style={styles.sub}>{item.supplier}</Text>         
         <Text style={styles.sub}>${item.price}</Text>         
         </View>
          </TouchableOpacity>
    </View>
  );
};

export default SearchTile;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#FFF",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom:SIZES.small,
      flexDirection: "row",
      padding:SIZES.medium,
      borderRadius:SIZES.small,
      ...SHADOWS.medium,
      shadowColor:COLORS.lightWhite
    },image:{
      width:70,
      backgroundColor:COLORS.secondary,
      justifyContent: "center",
      alignContent: "center"
    },productImg:{
      width:"100%",
      height:65,
      borderRadius:SIZES.small,
      resizeMode:"cover"   
    },
    textContainer:{
      flex:1,
      marginHorizontal:SIZES.medium
    },
    ProductTitle:{
      fontSize:SIZES.medium,
      fontWeight: "bold",
      color: COLORS.primary
    },
    sub:{
      fontSize:SIZES.small+2,
      color: COLORS.gray,
      fontFamily: "regular",
      marginTop:3
    }
  });
  