import { Text as RNText } from "react-native";

const typographies = {
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  }, 
  h2: {
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 28,
  }, 
  p1: {
    fontSize: 18,
    lineHeight: 24,
  },
  p2: {
    fontSize: 16,
    lineHeight: 22,
  },
};

const colors = {
  "black": "#000",
  "grey": "rgb(80, 80, 80)",
  "white": "#fff",
  "blue": "#00f",
  "red": "#f00",
  "green": "#0f0",
};

export const Text = ({ color = "gery", onPress = () => {}, style = {}, typography = "p1", value = "ERROR" }) => {
  const defaultStyles = {
    ...(typographies[typography]),
    color: colors[color],
  };
  return <RNText onPress={onPress} style={[defaultStyles, style]}>{value}</RNText>;
};