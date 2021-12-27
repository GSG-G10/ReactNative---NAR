import { useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { db } from "../../db/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Text } from "../design/Text";
import AddForm from "../design/AddForm";

const AddSpecifications = ({ navigation, route }) => {
  const projects = useSelector((state) => state.projectsData);
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState("");

  const [specificationData1, setSpecificationData1] = useState({
    description: "",
    cost: "",
  });
  const [specificationData2, setSpecificationData2] = useState({
    description: "",
    cost: "",
  });
  const [specificationData3, setSpecificationData3] = useState({
    description: "",
    cost: "",
  });

  const onPress = () => {
    const docRef = doc(db, "projects", route.params.projectId);
    const specificationsArray = projects.filter(
      (project) => project.id === route.params.projectId
    )[0].specifications;

    setSuccess([]);
    setError("");

    if (
      (!specificationData1.description || specificationData1.cost === "") &&
      (!specificationData2.description || specificationData2.cost === "") &&
      (!specificationData3.description || specificationData3.cost === "")
    ) {
      setError("Add Specifications");
      console.log(3);
      console.log(specificationData1.cost);
    } else if (
      !(specificationData1.cost >= 0) ||
      !(specificationData1.cost >= 0) ||
      !(specificationData1.cost >= 0)
    ) {
      setError("Cost must be a number");
    } else {
      [specificationData1, specificationData2, specificationData3].forEach(
        (data) => {
          if (data.description && data.cost >= 0) {
            if (specificationsArray) {
              updateDoc(docRef, {
                specifications: [
                  ...specificationsArray,
                  { description: data.description, cost: data.cost },
                ],
              });
            } else {
              updateDoc(docRef, {
                specifications: [
                  { description: data.description, cost: data.cost },
                ],
              });
            }
            setSuccess((prev) => [
              ...prev,
              `${data.description} added successfully`,
            ]);
          }
        }
      );

      [
        setSpecificationData1,
        setSpecificationData2,
        setSpecificationData3,
      ].forEach((setDdata) => setDdata({}));
      setTimeout(() => navigation.navigate('Specifications'), 2000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AddForm
        specificationData={specificationData1}
        setSpecificationData={setSpecificationData1}
      />
      <AddForm
        specificationData={specificationData2}
        setSpecificationData={setSpecificationData2}
      />
      <AddForm
        specificationData={specificationData3}
        setSpecificationData={setSpecificationData3}
      />

      {error ? <Text style={styles.error} value={error} /> : null}
      {success.length
        ? success.map((elem) => <Text style={styles.success} value={elem} />)
        : null}

      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <Text value="SAVE CHANGES" typography="p2" style={styles.buttonText} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddSpecifications;

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 30,
  },
  button: {
    width: "50%",
    marginVertical: 30,
    borderRadius: 3,
    backgroundColor: "#3796f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonText: {
    color: "white",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginVertical: 5,
  },
  success: {
    textAlign: "center",
    color: "green",
    marginVertical: 5,
  },
});
