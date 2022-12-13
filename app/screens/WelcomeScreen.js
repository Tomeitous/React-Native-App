import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import LoginBackground from "../components/LoginBackground";

function WelcomeScreen({ navigation }) {
  return (
    <LoginBackground>
      <AppButton
        style={styles.ButtonContainer}
        title="Login"
        color="secondary"
        onPress={() => navigation.navigate("login")}
      ></AppButton>
      <AppButton
        style={styles.ButtonContainer}
        title="Register"
        onPress={() => navigation.navigate("register")}
      ></AppButton>
      <View style={styles.logoContainer}>
        <Text style={{ fontSize: 50 }}>Yama ry</Text>
        <Image
          style={styles.logo}
          source={require("../assets/yama-logo.png")}
        ></Image>
        <Text style={styles.logoText}>
          Helsinki University {"\n"} anime and manga club
        </Text>
        <Image
          style={styles.yamachan}
          source={require("../assets/yamachan.png")}
        ></Image>
      </View>
    </LoginBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "blue",
  },
  login: {
    width: "100%",
    height: 70,
    backgroundColor: "pink",
  },
  ButtonContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    height: 120,
    width: 120,
    alignItems: "center",
  },
  yamachan: {
    top: -40,
    height: 400,
    width: 400,
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 90,
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "600",
    paddingVertical: 10,
  },
});
export default WelcomeScreen;
