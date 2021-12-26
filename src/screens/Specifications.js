import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


const Specifications = ({ navigation, route }) => {

    return (
        <TouchableOpacity onPress={() =>
            navigation.navigate("AddSpecifications", {
              projectId: route.params.projectId,
              projectName: route.params.projectName
            })
          }>
            <Text>Hi</Text>
        </TouchableOpacity>
    )
}

export default Specifications
