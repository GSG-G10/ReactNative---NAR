import { View, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text } from "../design/Text";
import { Image } from "../design/Image";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";


const Messages = ({ navigation }) => {
  const projects = useSelector((state) => state.projectsData);

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      {projects.length
        ? projects.map((project) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Chat", {
                  receivedBy: project.emailAdmin,
                  receivedImg: project.imageAdmin,
                })
              }
              style={styles.cardContainer}
            >
              <Image
                uri={project.imageAdmin}
                width="70px"
                height="70px"
                borderRadus={20}
              />
              <View style={styles.cardContent}>
                <Text style={styles.name} typography="p1" value={project.projectName} />
                <Text
                  style={styles.projectName}
                  typography="p2"
                  value={`${project.projectName} Project`}
                />
              </View>
              <Text typography="p2" value="9:30 AM" />
            </Pressable>
          ))
        : null}
    </ScrollView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  pageContainer: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 10,
  },
  cardContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: 20,
  },
  cardContent: {
    flexDirection: "column",
    marginLeft: -40,
  },
  name: {
    fontWeight: "bold",
  },
  projectName: {
    color: "#8e8e93",
  },
});
