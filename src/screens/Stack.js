import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Stack() {
  const route = useRoute();
  const { id } = route.params;

  const [dogData, setDogData] = useState(null);

  const getDogData = () => {
    fetch(`https://api.thedogapi.com/v1/images/${id}`)
      .then((response) => response.json())
      .then((data) => setDogData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDogData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      {dogData ? (
        <>
          <Image source={{ uri: dogData.url }} style={styles.image} />
          {dogData.breeds && dogData.breeds.length > 0 ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Información del Perrito 🐶</Text>
              <Text style={styles.label}>Raza:</Text>
              <Text style={styles.text}>{dogData.breeds[0].name}</Text>

              <Text style={styles.label}>Peso:</Text>
              <Text style={styles.text}>
                {dogData.breeds[0].weight.metric} kg
              </Text>

              <Text style={styles.label}>Altura:</Text>
              <Text style={styles.text}>
                {dogData.breeds[0].height.metric} cm
              </Text>

              <Text style={styles.label}>Esperanza de vida:</Text>
              <Text style={styles.text}>{dogData.breeds[0].life_span}</Text>

              <Text style={styles.label}>Temperamento:</Text>
              <Text style={styles.text}>{dogData.breeds[0].temperament}</Text>

              <Text style={styles.label}>Origen:</Text>
              {/* Validación condicional para mostrar "Origen" o "No disponible" */}
              <Text style={styles.text}>
                {dogData.breeds[0].origin
                  ? dogData.breeds[0].origin
                  : "No disponible"}
              </Text>
            </View>
          ) : (
            <Text style={styles.noBreedText}>
              No se encontró información sobre la raza.
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.loadingText}>Cargando...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#7e2e8a",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7e2e8a",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7e2e8a",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    paddingLeft: 10,
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  noBreedText: {
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});
