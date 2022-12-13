import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

const AnimeCard = ({ children }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.Box}>{children}</View>
    </View>
  );
};

export default AnimeCard;

const styles = StyleSheet.create({
  Box: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: colors.secondary,
    margin: 10,
  },
});
