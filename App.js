import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import {
  HomeNavigator,
  LoginNavigator,
  MessagesNavigator,
} from "./components/Navigation";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { auth, logoutUser } from "./db/firebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { loginToken } from "./src/redux/actionCreator";

export default function App() {
  return (
    <Provider store={store}>
      <ChildApp />
    </Provider>
  );
}

function ChildApp() {
  const [isAuth, setIsAuth] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.setAccessToken);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth(user.email);
    }
  });

  useEffect(() => {
    dispatch(loginToken(isAuth));
  }, [dispatch, isAuth]);

  return (
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
                    size={22}
                    color={tabInfo.focused ? "#3796f3" : "#8e8e93"}
                  />
                );
              },
            }}
            component={HomeNavigator}
          />
          {token ? (
            <>
              <Tab.Screen
                name="Messages"
                options={{
                  headerShown: false,
                  tabBarIcon: (tabInfo) => {
                    return (
                      <Entypo
                        name="chat"
                        size={22}
                        color={tabInfo.focused ? "#3796f3" : "#8e8e93"}
                      />
                    );
                  },
                }}
                component={MessagesNavigator}
              />
              <Tab.Screen
                name="Logout"
                options={{
                  headerShown: false,
                  tabBarIcon: (tabInfo) => {
                    return (
                      <AntDesign
                        onPress={() => logoutUser()}
                        name="logout"
                        size={22}
                        color={tabInfo.focused ? "#3796f3" : "#8e8e93"}
                      />
                    );
                  },
                }}
                component={HomeNavigator}
              />
            </>
          ) : (
            <Tab.Screen
              name="Login"
              options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                  return (
                    <AntDesign
                      name="login"
                      size={24}
                      color={tabInfo.focused ? "#3796f3" : "#8e8e93"}
                    />
                  );
                },
              }}
              component={LoginNavigator}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
