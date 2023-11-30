import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, Setcount] = useState(1);
  const [userData,setUserData]=useState(null);
  const [userLogin,setUserLogin]=useState(null);
  const [useId, setUseId] = useState(null); 
  const [exist, setExist] = useState(false); 


  useEffect(()=>{
    checkExistingUser();
    checkFavorite();
  },[])
  const checkExistingUser =async ()=>{

    const id =await AsyncStorage.getItem('id');
    const userId =`user${JSON.parse(id)}`;
    try{
      const currentuser=await AsyncStorage.getItem(userId);
    if(currentuser!==null){
      const pasrsedData =JSON.parse(currentuser)
      setUserData(pasrsedData)
      setUserLogin(true)
      setUseId(userId); 
    }
  }catch(err){
    console.log('error',err);
  }
}
const AddToOrders = async (product ,count) => {
  try {
    await axios.post("http://10.0.2.2:3000/api/orders/", {
      customerId: useId.substring(4),
      productId:product._id,
      quantity: count,
      total:count*product.price,
      payment_status:'NotPaid',
    });
    navigation.replace("Orders");

  } catch (error) {
    console.error("Error adding item to the orders:", error);
  }
};
const AddToCart = async (cartItem ,count) => {
  try {
    await axios.post("http://10.0.2.2:3000/api/cart/", {
      userId: useId.substring(4),
      cartItem: cartItem,
      quantity :count
    });
    navigation.replace("Cart");

  } catch (error) {
    console.error("Error adding item to the cart:", error);
  }
};
const AddFav = async () => {
  try {
      await axios.post(`http://10.0.2.2:3000/api/favorite/addFav/${useId}/${item._id}`);
      
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}
const DeleteFav = async () => {
  try {
       await axios.delete(`http://10.0.2.2:3000/api/favorite/deleteFav/${useId}/${item._id}`);      
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}
const checkFavorite = async () => {
  try {
    const response = await axios.get(`http://10.0.2.2:3000/api/favorite/existInFav/${useId}/${item._id}`);

    if (response.status === 200) {
      const isFavorite = response.data.exists; // Assuming the existence status is in the 'exists' property
      if (isFavorite) {
        console.log("Item is already a favorite");
      } else {
        console.log("Item is not a favorite");
      }
    } else {
      console.log("Failed to check favorite status");
    }
  } catch (error) {
    console.error("Error checking favorite status:", error);
  }
};

const like = ()=>{
if(userData!==null){
    if(exist===false){
      AddFav();
      setExist(true);
      }else{
      DeleteFav();
      setExist(false);
    }
  }else{
    Alert.alert(
      "LogIn",
      "please login first to add favorite",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () =>navigation.navigate("Login")},
      ],
      { defaultIndex: 1 }
    );
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => like()} >
          <Ionicons name={exist? "heart" : "heart-outline"} size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>4.9</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => Setcount(count + 1)}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity
              onPress={() => {
                count > 1 ? Setcount(count - 1) : Setcount(1);
              }}
            >
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>
            {item.description}
          </Text>
        </View>
        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="locate-outline" size={20} />
              <Text>{item.product_location}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={20}
                style={{ padding: 2 }}
              />
              <Text>Free Shipping</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={()=>AddToOrders(item,count)} style={styles.cartBtn}>
            <Text style={styles.carTitle}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>AddToCart(item._id,count)} style={styles.addCart}>
          <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite}/>        
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: SIZES.small,
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    padding: SIZES.large,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginLeft: 0,
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.large - 2,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
    padding: 5,
  },
  descText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },cartRow:{
    paddingBottom: SIZES.small,
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 34,
  },cartBtn:{
    width:SIZES.width*0.7,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
    marginLeft:12,
    padding:SIZES.small

  },carTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite
  },addCart:{
    height:37,
    width :37,
    borderRadius: 50,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    margin:SIZES.small,

  },
});
