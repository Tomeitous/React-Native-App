import React, { useEffect, useState } from "react";
import { Button, Image, View, StatusBar, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import AppButton from "./AppButton";

export default function ImagePickerExample() {
  const id = auth.currentUser?.email;

  const docRef = (img) =>
    getDoc(doc(db, "profilepic", id)).then(() => {
      console.log("doesn't exist");
      setDoc(doc(db, "profilepic", id), {
        image: img,
      });
      console.log("document " + id + " added to database!");
    });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      docRef(result.uri);
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <AppButton
        color="secondary"
        title="change profile pic"
        onPress={pickImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 5,
  },
});
