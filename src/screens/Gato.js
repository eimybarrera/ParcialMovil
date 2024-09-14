import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Gato() {
  const [Data, setData] = useState([]);
  const navigation = useNavigation();

  const getApi = () => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((Response) => Response.json())
      .then((dataApi) => setData(dataApi))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getApi();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={()=> navigation.navigate('InfoGatos', {id: item.id})} >
          <Text style={styles.buttonText}> Ver mas </Text>

      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <Text>Lista de Gaticos</Text>
      <FlatList 
        data={Data} 
        renderItem={renderItem}
        keyExtractor={(item)=> item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#E6E6FA'
  },
  container: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#7e2e8a',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
