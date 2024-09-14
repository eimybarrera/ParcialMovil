import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [Data, setData] = useState([]);
  const navigation = useNavigation();

  const getApi = () => {
    fetch('https://api.thedogapi.com/v1/images/search?limit=10')
      .then((response) => response.json())
      .then((dataApi) => setData(dataApi))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getApi();
  }, []);

  // Función para renderizar cada ítem (perro) en la lista
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Stack', { id: item.id })}
      >
        <Text style={styles.buttonText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <Text>Lista de Perros</Text>

      {/* FlatList para mostrar las imágenes de perros */}
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  flatListContent: {
    paddingBottom: 20,
  },
});
