import React from 'react';
import { StyleSheet,TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS, SIZES } from '../../constants/index';

 const Carousel = () => {
    const slides =["https://smartfurniture.com.eg/wp-content/uploads/2023/05/Mood-Landscape-600x600.jpg",
                   "https://media.designcafe.com/wp-content/uploads/2021/11/09191216/living-room-interior-design-photo-gallery-where-black-laminated-tv-unit-design.jpg",
                   "https://media.designcafe.com/wp-content/uploads/2021/12/27144355/design-cafe-modular-furniture-benefits.jpg"]
    return (
        <View style={styles.carouselContainer}>
            <SliderBox images={slides}
                dotColor={COLORS.primary}
                inactiveDotColor ={COLORS.secondary}
                ImageComponentStyle={{ borderRadius: 15, width: "92%", marginTop: 15 }}
                autoplay
                circleloop
            />
         </View>
    );
}

export default Carousel;
 
const styles =StyleSheet.create({
    carouselContainer:{
        flex:1,
        alignItems:"center"
    }
})