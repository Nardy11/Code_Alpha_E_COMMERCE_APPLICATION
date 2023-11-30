import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  location: Yup.string().min(3, 'Provide a valid location').required('Required'),
  username: Yup.string().required('Required'),
});


const SingUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState({
    username: "",
    email: "",
    location: "",
    password: "",
  });
  const [obsecure, setObsecure] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    location: "",
    username: "",
  });
  const registerUser = async (values) => {
    setLoader(true);
    try {
      const endpoint = "http://10.0.2.2:3000/api/register";
      const response = await axios.post(endpoint, values);
      if (response.status === 201) {
        navigation.replace("Login");
      }
    } catch (err) {
      console.error(err.response); // Log the server response for debugging
    } finally {
      setLoader(false);
    }
  };
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
      { cancelable: true }
    );
  };

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
            initialValues={{
              username: "",
              email: "",
              location: "",
              password: "",
            }}
            
            validationSchema={validationSchema}
            onSubmit={(values) => {
              registerUser(values);
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
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.username ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="human-male-female"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconstyle}
                    />
  <TextInput
                      placeholder="Enter username"
                      onFocus={() => {
                        setTouched("username");
                      }}
                      onBlur={() => setTouched("username", "")}
                      value={values.username}
                      onChangeText={handleChange("username")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>
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
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.location ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconstyle}
                    />
                    <TextInput
                      placeholder="Enter location"
                      onFocus={() => {
                        setTouched("location");
                      }}
                      onBlur={() => setTouched("location", "")}
                      value={values.location}
                      onChangeText={handleChange("location")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
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
                      placeholder="Enter password"
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
                  onPress={
                    isValid
                      ? handleSubmit
                      : () => inValidForn(errors, setTouched)
                  }
                  style={styles.btnstyle}
                >
                  <Text style={{ color: "white" }}>S I G N U P</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SingUp;

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
});
