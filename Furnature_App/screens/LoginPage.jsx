import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(
      8,
      "Must be 8 characters or more"
    )
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});
const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState({});
  const [obsecure, setObsecure] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const inValidForn = () => {
    Alert.alert(
      "Invalid Credentials",
      "Please enter valid credentials",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ],
      { defaultIndex: 1 }
    );
  };
  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = "http://10.0.2.2:3000/api/login";
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
       setResponseData(response.data)

       await AsyncStorage.setItem(`user${responseData._id}`,JSON.stringify(responseData))
       
       await AsyncStorage.setItem(`id`,JSON.stringify(responseData._id))
        navigation.replace("Bottom Navigation")
      } else {
        Alert.alert(
          "Invalid Log in Credentials",
          "Please enter valid credentials",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            { text: "OK", onPress: () => {} },
          ],
          { defaultIndex: 1 }
        );
      }
    } catch (err) {

    Alert.alert(
      "Invalid Log in Credentials",
      "Please enter valid credentials",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ],
      { defaultIndex: 1 }
      );  };
    } 
      return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backbtn}
          >
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.cover}
          />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              login(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              values,
              errors,
              touched,
              setTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconstyle}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => {
                        setTouched("email");
                      }}
                      onBlur={() => setTouched("email", "")}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconstyle}
                    />
                    <TextInput
                      placeholder="Enter Password"
                      secureTextEntry={obsecure}
                      onFocus={() => {
                        setTouched("password");
                      }}
                      onBlur={() => setTouched("password", "")}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        setObsecure(!obsecure);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsecure ? "eye-off-outline" : "eye-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.btnstyle}
                >
                  <Text
                    style={{ color: "white" }}
                    onPress={isValid ? handleSubmit :inValidForn}
                  >
                    {loader ? "L O G I N" : <ActivityIndicator />}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={styles.registeration}
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  backbtn: {
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    top: SIZES.large - 10,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginBottom: SIZES.xxLarge,
    alignItems: "center",
  },
  btnstyle: {
    height: 50,
    width: "100%",
    marginVertical: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  wrapper: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "left",
  },
  inputWrapper: (color) => ({
    borderColor: color,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  iconstyle: {
    marginLeft: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    textAlign: "left",
    marginTop: 5,
  },
  registeration: {
    textAlign: "center",
    marginTop: 10,
  },
});
