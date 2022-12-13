import React from "react";
import { View, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const handleSignUp = ({ email, password }) => {
  createUserWithEmailAndPassword(auth, { email }, { password })
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export default handleSignUp;
