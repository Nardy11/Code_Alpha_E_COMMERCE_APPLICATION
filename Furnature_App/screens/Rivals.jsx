import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/index";
import { useRoute } from "@react-navigation/native";
import { ProductList } from "../components";
const Rivals = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.lightWhite} />
        </TouchableOpacity>
        <Text style={styles.heading}>Products</Text>
        </View>
        <ProductList />
      </View>
    </SafeAreaView>
  );
};

export default Rivals;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:COLORS.lightWhite
    },wrapper:{
        flex: 1,
        backgroundColor:COLORS.lightWhite
    },upperRow:{
        width:SIZES.width-50,
        marginHorizontal:SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        position:"absolute",
        backgroundColor:COLORS.primary,
        borderRadius:SIZES.large,
        top:SIZES.large,
        zIndex:999
    },heading:{
        fontFamily:"semibold",
        fontSize:SIZES.medium,
        color:COLORS.lightWhite,
        marginLeft:5
    }
});
