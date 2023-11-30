import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";


const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

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


  const DeleteAccount = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("cashed")},
      ],
      { defaultIndex: 1 }
    );
  };
  const userlogout = async() => {
    const id =await AsyncStorage.getItem('id');
    const useId =`user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([useId,'id']);
      navigation.replace('Bottom Navigation')
    } catch (error) {
      console.log('error log out',err);
    }
  }
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () =>userlogout()},
      ],
      { defaultIndex: 1 }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />
      <Image
        source={require("../assets/images/space.jpg")}
        style={styles.cover}
      />
      <View style={styles.profileContainer}>
        <Image
          source={userLogin === true? require("../assets/images/profile.jpeg"):require("../assets/images/userDefault.png")}
          style={styles.profile}
        />
        <Text style={styles.name}>
          {userLogin === true
            ? userData.name
            : "Please login into your Account"}
        </Text>

        {userLogin === false ? (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>L O G I N</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.loginBtn}>
            <Text style={styles.menuText}>{userData.email}</Text>
          </View>
        )}

        {userLogin === false ? (
          <View>

          </View>
        ) : (
          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuItemText}>Favorites</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>  navigation.navigate("Orders")}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuItemText}>Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>  navigation.navigate("Cart")}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="bag-personal-outline"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuItemText}>Cart</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => DeleteAccount()}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="delete"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuItemText}>Delete Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => logout()}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="logout"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 290,
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    marginTop: -100,
    borderWidth: 2,
    borderColor: COLORS.primary,
    resizeMode: "cover",
  },
  name: {
    fontFamily: "bold",
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 4,
    borderWidth: 0.4,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xxLarge,
  },
  menuText: {
    fontFamily: "regular",
    color: COLORS.gray,
    fontWeight: "600",
    marginLeft: 20,
    fontSize: 14,
    lineHeight: 26,
    marginLeft: -2,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
  menuItemText: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.primary,
    fontSize: 18,
  },
});
