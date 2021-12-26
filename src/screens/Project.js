import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../design/Text";
import { Image } from "../design/Image";
import { db } from "../../db/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Project = ({ navigation, route }) => {
  const projects = useSelector((state) => state.projectsData);

  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const getProjectById = projects?.filter(
      (project) => project.id === route.params.projectId
    );
    setProjectData(getProjectById[0]);
  }, []);

  return (
    <>
      {projectData?.projectName ? (
        <View style={styles.container}>
          <Text
            style={styles.title}
            typography="h1"
            value={`${projectData.projectName} Project`}
          />
          <View style={styles.detailsContainer}>
            <Text
              style={{ color: "orange" }}
              typography="p2"
              value={projectData.progress.toUpperCase() || "estimate sent".toUpperCase()}
            />
            <Text value={`${projectData.cost} $`} />
          </View>
          <Image uri={projectData.image} />
          <View style={styles.lists}>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() =>
                navigation.navigate("Specifications", {
                  projectId: route.params.projectId,
                  projectName: projectData.projectName
                })
              }
            >
              <AntDesign name="setting" size={24} color="black" />
              <Text style={styles.listText} value="Specifications" />
            </TouchableOpacity>
            <View style={styles.listContainer}>
              <AntDesign name="form" size={24} color="black" />
              <Text style={styles.listText} value="Estimate" />
            </View>
            <View style={styles.listContainer}>
              <AntDesign name="checkcircleo" size={24} color="black" />
              <Text style={styles.listText} value="Punch List" />
            </View>
            <View style={styles.listContainer}>
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={styles.listText} value="Schedule" />
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Project;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    width: "85%",
    paddingTop: 30,
  },
  lists: {
    width: "85%",
    marginVertical: 15,
  },
  listContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginHorizontal: "auto",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  listText: {
    marginLeft: 10,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
    marginHorizontal: "auto",
    paddingVertical: 20,
    marginVertical: 5,
    justifyContent: "space-between",
  },
});
