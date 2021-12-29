import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login"
import Specifications from "./src/screens/Specifications";
import Project from "./src/screens/Project";
import AddSpecifications from "./src/screens/AddSpecifications";
import Messages from './src/screens/Messages'
import Chat from './src/screens/Chat'

const Stack = createNativeStackNavigator();


export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="HomePage"
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
        <Stack.Screen name="Specifications" component={Specifications} />
        <Stack.Screen
          name="AddSpecifications"
          component={AddSpecifications}
          options={({ route }) => ({
            title: `${route.params.projectName} Specifications`,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};


export const MessagesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};


export const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
