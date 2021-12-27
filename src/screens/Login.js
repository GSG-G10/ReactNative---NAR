import React, { useState } from "react";
import { View, StyleSheet, Platform, TextInput, Button } from "react-native";
import {  useDispatch } from "react-redux";

import { Text } from "../design/Text";
import { signUp, signInuser } from "../../db/firebaseConfig";
import { loginToken, signupToken } from "../redux/actionCreator";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();


    const handleSubmit = async (email, password, cb) => {
      if (!email || !password) {
        setError("all fields required");
        return;
      }
      try {
        await cb(email, password);
        return navigation.navigate('Home');
  
      } catch (err) {
        setError(err.message.split("/")[1].split(")")[0]);
      }
    };

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
          <Button
            title="Log In"
            color="#06bcee"
            onPress={() => {
              handleSubmit(email, password, signInuser);
            }}
          />
        </View>
        <View style={styles.signUpContainer}>
          <Button
            title="Sign Up"
            color={Platform.OS === "android" ? "#06bcee" : "#fff"}
            onPress={() => {
              handleSubmit(email, password, signUp);
            }}
          />
        </View>
      </View>
      {error ? <Text style={styles.error} value={error} /> : null}
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
  error: {
    textAlign: "center",
    color: "red",
    marginVertical: 5,
  },
});

export default Login;
