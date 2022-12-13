import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Button,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function App() {
  const handlePress = () => console.log("text is pressed");
  console.log(Dimensions.get("screen"));

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WelcomeScreen></WelcomeScreen>
      <Image
        style={{
          flex: 10,
        }}
        blurRadius={3}
        fadeDuration={1000}
        source={{
          width: "100%",
          height: "100%",
          uri: "https://picsum.photos/200/300",
        }}
      ></Image>
      <View
        style={{
          zIndex: 100,
          position: "absolute",
          width: 200,
          height: 200,
          top: "15%",
        }}
      >
        <Image
          source={{
            width: "100%",
            height: "100%",
            uri: "https://picsum.photos/200/300",
          }}
        ></Image>
        <Text style={styles.Text}>moi kaikki</Text>
      </View>
      <View
        style={{
          backgroundColor: "gold",
          flex: 1,
          width: "100%",
        }}
      />

      <View
        style={{
          backgroundColor: "tomato",
          width: "100%",
          flex: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    flex: 2,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },

  Text: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    width: 200,
    opacity: 0.5,
  },
});
