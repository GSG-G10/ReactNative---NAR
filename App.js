import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={<Text>Hi Home</Text>} />
          <Stack.Screen name="Project" component={<Text>Hi Project</Text>} />
          <Stack.Screen
            name="Specifications"
            component={<Text>Hi Specifications</Text>}
          />
          <Stack.Screen
            name="Add Specifications"
            component={<Text>Hi Add Specifications</Text>}
          />
          <Stack.Screen name="Sign Up" component={<Text>Hi Sign Up</Text>} />
          <Stack.Screen name="Sign In" component={<Text>Hi Sign In</Text>} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
