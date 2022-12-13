import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Favorites() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const animesCol = collection(db, "animes");
    const querySnapshot = await getDocs(animesCol);
    const animesList = querySnapshot.docs.map((doc) => doc.data().image);
    setData(animesList);
    console.log(animesList);
    data.map((icons) => (
      <View>
        <Image source={icons.uri} />
      </View>
    ));
  };
}
const styles = StyleSheet.create({});
