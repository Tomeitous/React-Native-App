import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", width = "100%" }) {
  return (
    <TouchableOpacity
      style={[styles.Button, { backgroundColor: colors[color], width: width }]}
      onPress={onPress}
    >
      <Text style={styles.Text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  Text: {
    color: colors.black,
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppButton;
