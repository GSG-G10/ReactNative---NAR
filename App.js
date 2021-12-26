import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";

import { store } from "./src/redux/store";
import Home from "./src/screens/Home";
import Project from "./src/screens/Project";
import Specifications from "./src/screens/Specifications";
import AddSpecifications from "./src/screens/AddSpecifications";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Project"
                component={Project}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Specifications"
                component={Specifications}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AddSpecifications"
                component={AddSpecifications}
                options={({ route }) => ({ title: `${route.params.projectName} Estimate` })}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
