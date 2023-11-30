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
import { FlatList } from "react-native-gesture-handler";
import SearchTile from "../components/products/SearchTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./search.style";
import { useNavigation } from "@react-navigation/native";

const Orders = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [useId, setUseId] = useState(null);

  useEffect(() => {
    checkExistingUser();
  }, []);

  useEffect(() => {
    if (useId !== null) {
      getUserOrder();
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

  const getUserOrder = async () => {
    console.log("Fetching Orders for user ID:", useId);
    try {
      const response = await axios.get(
        `http://10.0.2.2:3000/api/orders/${useId}`
      );
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const removeFromOrder = async (orderId) => {
    try {
      console.log(useId);
      customerId=useId;
      await axios.delete(`http://10.0.2.2:3000/api/orders/${orderId}/${customerId}`);
      getUserOrder(); // Refresh the orders after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        My Order List
      </Text>

      {orders.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
       </View>
      ) : (
        <>
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <>
                <SearchTile item={item.productId} />
                <TouchableOpacity
                  onPress={() => removeFromOrder(item._id)}
                  style={styles.cartBtn}
                >
                  <Text style={styles.carTitle}>REMOVE NOW</Text>
                </TouchableOpacity>
              </>
            )}
            style={{ marginHorizontal: 12 }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Orders;
