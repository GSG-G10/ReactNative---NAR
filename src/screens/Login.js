import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, TextInput, Button } from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import { LoadingScreen } from "../design/Loading";
import { Text } from "../design/Text";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {});

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel} value="Email" />
        <TextInput
          style={styles.inputText}
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel} value="Password" />
        <TextInput
          style={styles.inputText}
          onChangeText={(e) => setPassword(e)}
          value={password}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.loginContainer}>
          <Button title="Log In" color="#06bcee" />
        </View>
        <View style={styles.signUpContainer}>
          <Button
            title="Sign Up"
            color={Platform.OS === "android" ? "#06bcee" : "#fff"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    height: "14%",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 5,
  },
  inputText: {
    backgroundColor: "#fff",
    height: "50%",
    paddingLeft: 10,
    borderRadius: 15,
  },
  inputLabel: {
    paddingLeft: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "50%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  signUpContainer: {
    width: "47%",
    backgroundColor: "#06bcee",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Platform.OS === "android" ? "#f1f1f1" : "#fff",
  },
  loginContainer: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Platform.OS === "android" ? "#f1f1f1" : "#06bcee",
  },
});

export default Login;
