import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Text } from "./Text";

const AddForm = ({ specificationData, setSpecificationData }) => {
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };
  const handleChange = (e, type) => {
    setSpecificationData({
      ...specificationData,
      [type]: e,
    });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer} style={styles.descriptionContainer}>
        <Text value="Description" />
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={(e) => handleChange(e, "description")}
          style={[styles.inputs, isFocus ? styles.focusedInput : null]}
        />
      </View>
      <View style={styles.inputContainer} style={styles.costContainer}>
        <Text value="Cost $" />
        <TextInput
          keyboardType="numeric"
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={(e) => handleChange(+e, "cost")}
          style={[styles.inputs, isFocus ? styles.focusedInput : null]}
        />
      </View>
    </View>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    height: "4%",
    marginVertical: 20,
  },
  inputs: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: "2%",
    padding: 10,
  },
  descriptionContainer: {
    width: "70%",
  },
  costContainer: {
    width: "25%",
  },
  focusedInput: {
    borderColor: "#3796f3",
    borderWidth: 1,
  },
});
