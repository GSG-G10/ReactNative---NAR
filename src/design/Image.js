import { useState } from "react";
import { ActivityIndicator, Image as RNImage, View } from "react-native";

const BASE_IMAGE_URI =
  "https://cloudinary.fifa.com/m/10de8c2e70f2d8d8/webimage-default_person.png?tx=c_fill,ar_1.00,g_auto,q_auto,w_50";

export const Image = ({ height = '25%', uri = BASE_IMAGE_URI, width = '100%' }) => {
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
        style={{width:'100%', height: '100%'}}
      />
      {isImageLoading && !isError && (
        <ActivityIndicator
          color="#0000ff"
          size="small"
        />
      )}
    </View>
  );
};
