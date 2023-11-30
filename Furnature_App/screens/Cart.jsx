import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  Fontisto,
  SimpleLineIcons,
  Feather,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/index";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SearchTile from "../components/products/SearchTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./search.style";
import { presentPaymentSheet, useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";

const Cart = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [Result, setResult] = useState([]);
  const [useId, setUseId] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});
  const [total, Settotal] = useState(0);

  useEffect(() => {
    checkExistingUser();
  }, []);

  useEffect(() => {
    if (useId !== null) {
      showCartItems();
    }
  }, [useId]);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentuser = await AsyncStorage.getItem(userId);
      console.log("Current User:", currentuser);
      if (currentuser !== null) {
        const parsedData = JSON.parse(currentuser);
        setUserData(parsedData);
        setUserLogin(true);
        setUseId(userId.substring(4));
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const showCartItems = async () => {
    console.log("Fetching Cart Items for user ID:", useId);
    try {
      const response = await axios.get(
        `http://10.0.2.2:3000/api/cart/find/${useId}`
      );
      const productsList = response.data[0].products;
      console.log("Cart Items:", productsList);
      setResult(productsList);

      // Update itemQuantities state with quantities for each item
      const quantities = {};
      productsList.forEach((item) => {
        quantities[item._id] = item.quantity;
        Settotal(total + item.quantity * parseInt(item.price));
      });
      setItemQuantities(quantities);
    } catch (err) {
      console.log("error", err);
    }
  };
  const increment = async (cartItem) => {
    try {
      await axios.put("http://10.0.2.2:3000/api/cart/incrementquantity", {
        userId: useId,
        cartItem: cartItem._id,
      });

      navigation.replace("Cart");
    } catch (error) {
      console.error("Error incrementing item:", error);
    }
  };

  const decrement = async (cartItem) => {
    try {
      await axios.put("http://10.0.2.2:3000/api/cart/decrementquantity", {
        userId: useId,
        cartItem: cartItem._id,
      });

      navigation.replace("Cart");
     
    } catch (error) {
      console.error("Error decrementing item:", error);
    }
  };

  const deleted = async (cartItem) => {
    try {
      console.log(cartItem._id);
      await axios.delete(`http://10.0.2.2:3000/api/cart/${cartItem._id}/${useId}`);
      navigation.replace("Cart");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <SafeAreaView>
      <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        My Cart Items
      </Text>

      {Result.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={Result}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <>
                <SearchTile item={item.cartItem} />
                <View style={styles.rating}>
                  <TouchableOpacity onPress={() => increment(item.cartItem)}>
                    <SimpleLineIcons name="plus" size={20} />
                  </TouchableOpacity>
                  <Text>{itemQuantities[item._id] || 1}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      itemQuantities[item._id] > 1
                        ? decrement(item.cartItem)
                        : deleted(item.cartItem)
                    }
                  >
                    <SimpleLineIcons name="minus" size={20} />
                  </TouchableOpacity>
                </View>
              </>
            )}
            style={{ marginHorizontal: 12 }}
          />
          <View style={styles.total}>
            <Text style={styles.totalTxt}>Total: ${total}</Text>
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.carTitle}>BUY NOW</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;
