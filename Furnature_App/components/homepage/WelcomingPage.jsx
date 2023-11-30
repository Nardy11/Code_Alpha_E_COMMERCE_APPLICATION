import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './welcoming';
import { Ionicons, Fontisto, Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/index';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const Welcomings = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>
                    Find The Most
                </Text>
                <Text style={styles.welcomeTxt(COLORS.primary, 0)}>
                    Luxurious Furniture
                </Text>
            </View>
            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name='search' size={24} style={styles.searchIcon} />
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onPressIn={() => navigation.navigate("Search")}
                        placeholder='what are you looking for?'
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default Welcomings;
