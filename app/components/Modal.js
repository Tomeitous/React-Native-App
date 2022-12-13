import React from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import colors from "../config/colors";

function ModalAlert({ visible, text }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        style={{}}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <View
          style={{
            height: 70,
            alignItems: "center",
            backgroundColor: colors.third,
            borderRadius: 15,
            justifyContent: "center",
            margin: 25,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>{text}</Text>
        </View>
      </Modal>
    </View>
  );
}

export default ModalAlert;
