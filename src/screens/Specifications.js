import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import { LoadingScreen } from "../design/Loading";
import { Text } from "../design/Text";

const Specifications = ({ navigation, route }) => {
  const [specifications, setSpecifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const projects = useSelector((state) => state.projectsData);

  useEffect(() => {
    setIsLoading(true);
    const getProjectById = projects?.filter(
      (project) => project.id === route.params.projectId
    );
    setSpecifications(getProjectById[0].specifications);
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.specificationsScreen}>
      <TouchableOpacity
        style={styles.addSpecification}
        onPress={() =>
          navigation.navigate("Add Specifications", {
            projectId: route.params.projectId,
          })
        }
      >
        <Entypo name="add-to-list" size={32} color="black" />
      </TouchableOpacity>
      <View style={styles.specificationsContainer}>
        {isLoading ? (
          <LoadingScreen />
        ) : specifications?.length ? (
          specifications.map((specification) => (
            <View
              key={specification.description}
              style={styles.specificationCard}
            >
              <Text value={specification.description} typography="h2" />
              <Text value={specification.cost} typography="p1" />
            </View>
          ))
        ) : (
          <Text value="there is no data to show" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  specificationsScreen: {
    flex: 1,
  },
  addSpecification: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "12%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  specificationsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
  },
  specificationCard: {
    borderBottomWidth: 2,
    borderBottomColor: "rgb(80, 80, 80)",
    flexDirection: "row",
    width: "90%",
    height: "7.5%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});

export default Specifications;
