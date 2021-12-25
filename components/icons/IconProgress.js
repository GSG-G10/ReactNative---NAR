import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconProgress = ({status}) => {
  switch (status) {
    case "complete":
      return (
        <MaterialCommunityIcons name="progress-check" size={24} color="green" />
      );
    case "in progress":
      return (
        <MaterialCommunityIcons
          name="progress-clock"
          size={24}
          color="orange"
        />
      );
    case "cancelled":
      return (
        <MaterialCommunityIcons name="progress-close" size={24} color="red" />
      );
    default:
      return (
        <MaterialCommunityIcons
          name="progress-wrench"
          size={24}
          color="yellow"
        />
      );
  }
};

export default IconProgress;
