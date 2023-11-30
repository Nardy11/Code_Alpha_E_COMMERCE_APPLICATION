import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./search.style";
import { Ionicons, Fontisto, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/index";
import { FlatList, TextInput } from "react-native-gesture-handler";
import axios from "axios";
import SearchTile from "../components/products/SearchTile";
const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = async() => {
    try {
      const responce =await axios.get(`http://10.0.2.2:3000/api/products/search/${searchKey}`)
      setSearchResult(responce.data);
    } catch (err) {
      console.log('error',err);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="what are you looking for?"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPressIn={() => handleSearch()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length===0?(
        <View style={{flex:1}}>
          <Image source={require('../assets/images/Pose23.png')} style={styles.searchImage}/>
          </View>
      ):(
        <FlatList 
        data={searchResult}
        keyExtractor={(item)=>item._id}
        renderItem={({item})=>(<SearchTile item={item} />)}
        style={{marginHorizontal:12}}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
