import { StyleSheet } from "react-native";
import {COLORS,SIZES} from '../constants/index';

 const styles=StyleSheet.create({
    container:{
        width:"100%"
    },welcomeTxt:(color,top)=>({
        fontFamily:"bold",
        fontSize:SIZES.xxLarge - 5,
        marginTop:top,
        color:color,
        marginHorizontal:SIZES.small
    }),searchContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignContent:'center',
        marginHorizontal:SIZES.small,
        backgroundColor:COLORS.secondary,
        borderRadius:SIZES.medium,
        marginVertical:SIZES.medium,
        height:50
    },
    searchIcon:{
        marginHorizontal:10,
        color:COLORS.gray,
        marginTop:SIZES.small
    },searchWrapper:{
        flex:1,
        backgroundColor:COLORS.secondary,
        marginRight:SIZES.small,
        borderRadius:SIZES.small
    },searchInput:{
        fontFamily:"regular",
        width:"100%",
        height:"100%",
        paddingHorizontal:SIZES.small
    },searchBtn:{
        width:50,
        height:"100%",
        borderRadius:SIZES.medium,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLORS.primary
    },searchImage:{
        width:SIZES.width-100,
        height:SIZES.height-300,
        resizeMode:"contain"
    },cartBtn:{
        width:SIZES.width*0.7,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.large,
        justifyContent: "center",
        alignItems: "center",
        marginLeft:12,
        padding:SIZES.small,
        marginVertical: 10,
        alignSelf : "center",
    
      },carTitle: {
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.lightWhite
      },
      rating: {
        top: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: SIZES.large,
        marginVertical: SIZES.xSmall,
        paddingVertical : SIZES.small,
        alignSelf : "center",
      },
});
export default styles;
