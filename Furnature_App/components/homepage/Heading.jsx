import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS, SIZES } from '../../constants/index';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Heading = () => {
const navigate = useNavigation();
    return (
        <View style={styles.HeadingContainer}>
            <View style={styles.header}>
                <Text style={styles.Title}>New Rivals</Text>
                <TouchableOpacity onPress={()=>navigate.navigate("ProductList")}>
                    <Ionicons name='ios-grid' size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Heading;

const styles = StyleSheet.create({
    HeadingContainer: {
        marginTop:SIZES.medium,
        marginHorizontal:12,
    }, header: {
        flexDirection:"row",
        justifyContent:"space-between"
    }, Title: {
        fontFamily:"semibold",
        fontSize:SIZES.xLarge-2,
    }
})