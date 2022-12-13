import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
  TextInput,
  Button,
  Linking,
} from "react-native";
import { auth, db } from "../../firebase";
import AppButton from "../components/AppButton";
import LoginBackground from "../components/LoginBackground";
import AppText from "../components/AppText";
import { useNavigation } from "@react-navigation/core";
import ImagePickerExample from "../components/ImagePicker";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  QuerySnapshot,
  deleteDoc,
} from "firebase/firestore";
import Favorites from "../components/Favorites";
import { TouchableOpacity } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// TO DO ##
// "add anime" alert
// new user profile View if profilepic == null out on edit mode
//

function ViewImageScreen(props) {
  const [titles, setTitles] = useState([]);
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const user = auth.currentUser?.email;

  const [refreshing, setRefreshing] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    getProfile();
    getData();
  }, []);

  const getProfile = async () => {
    const docRef = doc(db, "profilepic", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().image);
      setImage(docSnap.data().image);
      setText(docSnap.data().about);
      setName(docSnap.data().name);
    } else {
      console.log("No such document!");
    }
  };

  const docRefProfileText = (text, name) =>
    getDoc(doc(db, "profilepic", user)).then(() => {
      console.log("doesn't exist");
      setDoc(
        doc(db, "profilepic", user),
        { about: text, name: name },
        { merge: true }
      );
      console.log("document " + id + " added to database!");
    });

  const getData = async () => {
    const animesCol = collection(db, user);
    const querySnapshot = await getDocs(animesCol);
    const animesList = querySnapshot.docs.map((doc) => doc.data());
    setData(animesList);
  };

  useEffect(() => {
    getData();
    getProfile();
  }, []);

  const [text, setText] = useState([]);

  const saveTextInput = () => {
    setText(text);
    setName(name);
    docRefProfileText(text, name);
    setEdit(false);
  };

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth.signOut();
    navigation.navigate("welcome");
    alert("Logged out");
  };
  return (
    <LoginBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profile}>
          <View style={styles.topButtons}>
            <AppButton
              style={styles.logoutButton}
              onPress={handleSignOut}
              title="🚪"
              color="secondary"
              width="15%"
            ></AppButton>
            <View style={{ width: "60%" }} />
            <AppButton
              style={[styles.editButton]}
              onPress={() => setEdit(true)}
              width="15%"
              title="⚙️"
              color="third"
            ></AppButton>
          </View>
          <Image source={{ uri: image }} style={styles.userImg} />
          {edit && <ImagePickerExample />}

          {edit ? (
            <>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name:</Text>

              <TextInput
                placeholder="Enter your name"
                onChangeText={(e) => setName(e)}
                style={{
                  height: 40,
                  width: "80%",
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                About Me:
              </Text>
              <TextInput
                placeholder="Enter something about you"
                style={{
                  height: 100,
                  width: "80%",
                  borderWidth: 1,
                  textAlignVertical: "top",
                  borderRadius: 10,
                  backgroundColor: "white",
                  padding: 5,
                  marginBottom: 50,
                }}
                multiline={true}
                numberOfLines={4}
                onChangeText={(e) => setText(e)}
                value={text}
              />
            </>
          ) : (
            <View style={styles.profile}>
              <Text style={styles.name}>{name}</Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "black",
                  padding: 10,
                  marginBottom: 50,
                }}
              >
                <Text style={styles.aboutText}>{text}</Text>
              </View>
            </View>
          )}
        </View>

        <ScrollView horizontal={true}>
          {data != null &&
            data.map((r, i) => (
              <View style={styles.animeBox} key={i}>
                <View style={styles.textBox}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                    numberOfLines={2}
                    multiline={true}
                  >
                    {r.title}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL(r.url)}>
                  <Image
                    style={styles.animePic}
                    source={{
                      uri: r.image,
                    }}
                  />
                </TouchableOpacity>
                {edit && (
                  <AppButton
                    title="remove"
                    onPress={() => deleteDoc(doc(db, user, r.title))}
                  />
                )}
              </View>
            ))}
        </ScrollView>

        {edit ? (
          <AppButton title="Save Changes" onPress={saveTextInput} />
        ) : (
          <View>
            <AppButton
              onPress={() => navigation.navigate("wiki")}
              width="100%"
              title="AI chat"
              color="third"
            ></AppButton>
            <AppButton
              width="100%"
              onPress={() => navigation.navigate("AnimeScreen")}
              title="Anime Search"
            ></AppButton>
          </View>
        )}
        <Favorites></Favorites>
      </ScrollView>
    </LoginBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profile: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    flex: 1,
  },
  topButtons: {
    marginTop: 30,
    height: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  animeBox: {
    width: 200,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  textBox: {
    height: 50,
    flexDirection: "column-reverse",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,

    marginBottom: 5,
  },
  username: {
    fontSize: 25,
    paddingBottom: 5,
  },
  aboutText: {
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "80%",
    height: 70,
    margin: 20,
  },
  animePic: {
    width: 200,
    height: 300,
  },
  editButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    roght: 20,
  },
  title: { width: 150, fontSize: 20, textAlign: "left" },
  details: { width: 150, fontSize: 15 },
});

export default ViewImageScreen;
