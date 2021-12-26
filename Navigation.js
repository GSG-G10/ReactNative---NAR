import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Specifications from "./src/screens/Specifications";
import Project from "./src/screens/Project";
import AddSpecifications from "./src/screens/AddSpecifications";
import { Text } from "./src/design/Text";

const Stack = createNativeStackNavigator();

const Messages = () => <Text />;

const HomeNavigator = () => {
  return (
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

export { HomeNavigator };

const MessagesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export { MessagesNavigator };
