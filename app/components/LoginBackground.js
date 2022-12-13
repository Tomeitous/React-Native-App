import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

const LoginBackground = ({ children, blurRadius }) => {
  return (
    <ImageBackground
      imageStyle={{
        bottom: 0,
      }}
      blurRadius={blurRadius}
      resizeMode="cover"
      style={styles.background}
      source={require("../assets/bg.jpg")}
    >
      {children}
    </ImageBackground>
  );
};

export default LoginBackground;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
