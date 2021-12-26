import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { HomeNavigator, MessagesNavigator } from "./Navigation";

const Tab = createBottomTabNavigator();

import { Entypo } from "@expo/vector-icons";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.tab,
            }}
            tabBarOptions={{
              activeTintColor: "#3796f3",
              inactiveTintColor: "grey",
            }}
          >
            <Tab.Screen
              name="Home"
              options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                  return (
                    <Entypo
                      name="home"
                      size={24}
                      color={tabInfo.focused ? "#3796f3" : "#8e8e93"}
                    />
                  );
                },
              }}
              component={HomeNavigator}
            />
            <Tab.Screen
              name="Messages"
              options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                  return (
                    <Entypo
                      name="chat"
                      size={24}
                      color={tabInfo.focused ? "#3796f3" : "#8e8e93"}
                    />
                  );
                },
              }}
              component={MessagesNavigator}
            />
            <Tab.Screen
              name="Log"
              options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                  return (
                    <Entypo
                      name="login"
                      size={24}
                      color={tabInfo.focused ? "#3796f3" : "#8e8e93"}
                    />
                  );
                },
              }}
              component={MessagesNavigator}
            />
          </Tab.Navigator>
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
  tab: {
    paddingBottom: 10,
    paddingTop: 10,
    height: "8%",
  },
});
