import { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { onSnapshot } from "firebase/firestore";
import { EvilIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { colRef } from "../../db/firebaseConfig";
import { Text } from "../design/Text";
import IconProgress from "../../components/icons/IconProgress";
import { LoadingScreen } from "../design/Loading";
import { setProjectsData } from "../redux/actionCreator";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectsData);

  const getTotalPrice = (arrOfSpecifications) => {
    const costs = arrOfSpecifications?.reduce((acc, curr) => {
      acc += curr.cost;
      return acc;
    }, 0);
    return costs;
  };

  useEffect(() => {
    setIsLoading(true);

    onSnapshot(colRef, (snapshot) => {
      let updated = [];
      snapshot.docs.forEach((project) => {
        updated.push({
          ...project.data(),
          id: project.id,
          cost: getTotalPrice(project.data().specifications) || 0,
        });
      });
      if (inputValue) {
        const filtered = updated.filter((project) =>
          project.projectName
            .toLowerCase()
            .startsWith(inputValue.toLowerCase().trim())
        );
        dispatch(setProjectsData(filtered));
      } else {
        dispatch(setProjectsData(updated));
      }

      setIsLoading(false);
    });
  }, [inputValue]);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <Text value="Projects" typography="h1" />
        <EvilIcons
          style={styles.iconSearch}
          name="search"
          color="black"
          onPress={() =>
            setShowInput((prev) => {
              return !prev;
            })
          }
        />
      </View>
      {showInput && (
        <TextInput
          style={styles.searchInput}
          onChangeText={(e) => setInputValue(e)}
          value={inputValue}
        />
      )}

      <View style={styles.projectsContainer}>
        {isLoading ? (
          <LoadingScreen />
        ) : projects?.length === 0 ? (
          <Text value="there is no data" />
        ) : (
          projects.map((project) => {
            return (
              <TouchableOpacity
                style={styles.projectCard}
                key={project.id}
                onPress={() =>
                  navigation.navigate("Project", { projectId: project.id })
                }
              >
                <View style={styles.projectContent}>
                  <Text value={project.projectName} />

                  <Text value={`${project.cost} $`} />
                </View>
                <View style={styles.projectStatus}>
                  <IconProgress status={project.progress} />
                  <Text
                    value={project.progress || "estimate sent"}
                    typography="p2"
                    style={styles.contentProgress}
                  />
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeHeader: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  iconSearch: {
    fontSize: 30,
    color: "rgb(80, 80, 80)",
  },
  projectsContainer: {
    flex: 1,
    paddingTop: "5%",
    alignItems: "center",
  },
  projectCard: {
    width: "90%",
    height: "14%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
  },
  projectContent: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectStatus: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  contentProgress: {
    color: "rgb(110, 110, 110)",
    paddingLeft: 5,
  },
  searchInput: {
    backgroundColor: "#fff",
    width: "90%",
    height: "5%",
    marginLeft: "5%",
    borderRadius: 15,
    paddingLeft: 15,
  },
});
