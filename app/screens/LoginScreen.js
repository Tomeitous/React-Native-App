import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import LoginBackground from "../components/LoginBackground";
import AppButton from "../components/AppButton";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        alert("wrong username or password");
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <LoginBackground blurRadius={9}>
      <View style={styles.container}>
        <Text>Login screen</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          ></TextInput>
        </View>
        <AppButton onPress={handleSignIn} title="Login"></AppButton>
      </View>
    </LoginBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
