import { useState } from "react";
import { ActivityIndicator, Image as RNImage, View } from "react-native";

const BASE_IMAGE_URI =
  "https://cloudinary.fifa.com/m/10de8c2e70f2d8d8/webimage-default_person.png?tx=c_fill,ar_1.00,g_auto,q_auto,w_50";

export const Image = ({ height = 50, uri = BASE_IMAGE_URI, width = 50 }) => {
  const styles = { height, width };
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  return (
    <View style={styles}>
      <RNImage
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
        onError={() => setIsError(true)}
        source={{ uri: isError ? BASE_IMAGE_URI : uri }}
        style={styles}
      />
      {isImageLoading && !isError && (
        <ActivityIndicator
          color="#0000ff"
          size="small"
          style={{
            position: "absolute",
            top: height / 2 - 10,
            left: width / 2 - 10,
          }}
        />
      )}
    </View>
  );
};
