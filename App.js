import { Dimensions, View } from "react-native";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import WikiScreen from "./app/screens/WikiScreen";
import AnimeScreen from "./app/screens/AnimeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const handlePress = () => console.log("text is pressed");
  console.log(Dimensions.get("screen"));

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="home" component={ViewImageScreen} />
        <Stack.Screen name="AnimeScreen" component={AnimeScreen} />
        <Stack.Screen name="wiki" component={WikiScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
