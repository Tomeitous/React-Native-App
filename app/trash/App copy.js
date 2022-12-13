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

export default function App() {
  const handlePress = () => console.log("text is pressed");
  console.log(Dimensions.get("screen"));

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "red",
          flex: 1,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "blue",
          width: "50%",
          height: 70,
        }}
      ></View>
      <Text style={styles.Text} onPress={handlePress}>
        Here is a random photo from picsum.photos. It's dimeninisons are 200x300
      </Text>
      <TouchableHighlight onPress={() => console.log("terve")}>
        <Image
          blurRadius={3}
          fadeDuration={1000}
          source={{
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300",
          }}
        />
      </TouchableHighlight>
      <TouchableNativeFeedback>
        <View style={{ width: 200, height: 100, backgroundColor: "pink" }} />
      </TouchableNativeFeedback>
      <Button
        color="green"
        title="click me"
        onPress={() =>
          Alert.alert("my title", "my message", [
            { text: "yes", onPress: () => console.log("yes") },
            { text: "no", onPress: () => console.log("no ") },
          ])
        }
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
    backgroundColor: "lightblue",
    opacity: 0.5,
  },
});
