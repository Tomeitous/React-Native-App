import React, { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  TextInput,
  Linking,
  Alert,
  Modal,
} from "react-native";
import AppButton from "../components/AppButton";
import LoginBackground from "../components/LoginBackground";
import AppText from "../components/AppText";
import { useNavigation } from "@react-navigation/core";
import AnimeCard from "../components/AnimeCard";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import ModalAlert from "../components/Modal";

function AnimeScreen(props) {
  const [titles, setTitles] = useState([]);
  const [img, setImg] = useState();
  const [url, setUrl] = useState();
  const [text, setText] = useState();
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const user = auth.currentUser?.email;

  const removeFavorite = (id) =>
    Alert.alert(
      "This is already in your favorites!",
      "Do you want to remove it from your favorites?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            deleteDoc(doc(db, user, id))
              .then(() => {
                setText(id + " has been removed from your favorites!");
                showModal();
              })
              .catch((error) => {
                console.log(error);
              }),
        },
      ]
    );

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1500);
  };

  const docRef = (id, image, title, url, user) =>
    getDoc(doc(db, user, id)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("exist");
        removeFavorite(id);
      } else {
        setDoc(doc(db, user, id), {
          image: image,
          title: title,
          user: user,
          url: url,
        });
        setText(id + " added to your favorites!");
        showModal();
      }
    });

  const getTitles = (searchText) => {
    fetch(`https://api.jikan.moe/v4/anime?q=${searchText}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((error) => console.error(error));
  };

  const saveTitle = (data) => {
    firestore().collection("Animes").add({ image, title, url });
  };

  const navigation = useNavigation();

  return (
    <LoginBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search Anime Titles..."
            defaultValue={searchText}
            style={styles.searchText}
            placeholderTextColor="#e0e0e0"
            blurOnSubmit={true}
            onSubmitEditing={() => getTitles(searchText)}
            onChangeText={(text) => {
              setSearchText(text);
            }}
          />
          <ModalAlert visible={modalVisible} text={text} />
        </View>

        {data != null
          ? data.map((r, i) => (
              <AnimeCard key={i}>
                <Text
                  onPress={() => Linking.openURL(r.url)}
                  multiline={true}
                  numberOfLines={2}
                  style={styles.title}
                >
                  {r.titles[0].title}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.details}>episodes: {r.episodes}</Text>
                  <Text style={styles.details}>
                    year: {r.aired.prop.from.year}
                  </Text>
                </View>
                <Image
                  style={styles.animePic}
                  source={{
                    uri: r.images.jpg.image_url ? r.images.jpg.image_url : null,
                  }}
                ></Image>

                <AppButton
                  onPress={() =>
                    docRef(
                      r.titles[0].title,
                      r.images.jpg.image_url,
                      r.titles[0].title,
                      r.url,
                      user
                    )
                  }
                  title="add to favorites"
                  color="secondary"
                  width="80%"
                ></AppButton>
              </AnimeCard>
            ))
          : console.log()}
      </ScrollView>
    </LoginBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchText: { fontSize: 25, flex: 1, color: "white" },
  searchBox: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.25,
  },
  image: {
    flex: 1,
  },

  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "80%",
    height: 70,
  },
  animePic: {
    width: "100%",
    height: 400,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
  },
  details: { width: "50%", fontSize: 20, textAlign: "center" },
});

export default AnimeScreen;
