import React from "react";
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    FlatList,
    ScrollView,
    Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/index";
import { useNavigation } from "@react-navigation/native";

const ProductCartView = ({item}) => {
const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails',{item})}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri:item.imageUrl}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={1} >{item.title}</Text>
                    <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
                    <Text style={styles.price} numberOfLines={1}>${item.price}</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name="add-circle" size={35} color={COLORS.primary}/>
                </TouchableOpacity>

            </View>

        </TouchableOpacity>
    );
};

export default ProductCartView;

const styles = StyleSheet.create({
    container: {
        width: 182,
        height: 240,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary
    },
    imageContainer: {
        flex: 1,
        width: 170,
        marginLeft: SIZES.small / 2,
        marginTop: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: 'hidden'
    },image:{
        aspectRatio:1,
        resizeMode:'cover'
    },details:{
        padding:SIZES.small
    },title:{
        fontFamily:"bold",
        fontSize: SIZES.large,
        marginBottom:2
    },supplier:{
        fontFamily:"regular",
        fontSize: SIZES.small,
        color:COLORS.gray
    },price:{
        fontFamily:"bold",
        fontSize: SIZES.medium,
    },addBtn:{
        position:"absolute",
        bottom:SIZES.xSmall,
        right:SIZES.xSmall
    }
    
});
