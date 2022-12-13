import React, { useEffect, useState, StyleSheet } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import AppButton from "../components/AppButton";
import LoginBackground from "../components/LoginBackground";

const WikiScreen = () => {
  const OpenAI = require("openai-api");
  const OPENAI_API_KEY = "SECRETKEY";
  const openai = new OpenAI(OPENAI_API_KEY);
  const [texti, setTexti] = useState("");
  const [answer, setAnswer] = useState("");

  const askPrompt = async () => {
    console.log(texti);
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: texti,
      maxTokens: 150,
      temperature: 0.6,
      topP: 1,
      presencePenalty: 0.3,
      frequencyPenalty: 0.3,
      bestOf: 1,
      n: 1,
      stream: false,
    });

    console.log(gptResponse.data);
    console.log(gptResponse.data.choices[0].text);
    setAnswer(gptResponse.data.choices[0].text);
  };

  return (
    <LoginBackground>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 75,
          }}
        >
          <TextInput
            style={{
              width: 200,
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
            onChangeText={(e) => setTexti(e)}
            value={texti}
          />
          <Text style={{ fontSize: 20, backgroundColor: "beige" }}>
            {texti}
          </Text>
          <Text style={{ fontSize: 20, backgroundColor: "white" }}>
            {answer}
          </Text>
          <AppButton
            width="100%"
            title="Prompt"
            onPress={() => askPrompt()}
            color="secondary"
          ></AppButton>
        </View>
      </ScrollView>
    </LoginBackground>
  );
};

export default WikiScreen;
