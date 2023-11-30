import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { BottomTabNavigation } from './navigation/BottomTabNavigation';
import { Cart, ProductDetails, Rivals,LoginPage, Orders, Favorites, SignUp } from './screens';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsloaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsloaded]);
  if (!fontsloaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <StripeProvider publishableKey="pk_test_51OHw9NKANFH79V7Kai1eBq2kkJwdJs94DK0BN21Y9skv0EGmC4xSiaV8QQdENJNAfIaVuzcpB2I3EFdrm8hqsjHi0016j39x5x">

      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navigation'
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Cart'
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProductDetails'
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProductList'
          component={Rivals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={LoginPage}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name='Orders'
          component={Orders}
          options={{ headerShown: false }}
          />
                <Stack.Screen
          name='Favorites'
          component={Favorites}
          options={{ headerShown: false }}
          />
      <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
          />
      </Stack.Navigator>
          </StripeProvider>
    </NavigationContainer>
  );
}

