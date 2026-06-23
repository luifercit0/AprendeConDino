import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DinoHeader from "../components/DinoHeader";

export default function ColoresScreen() {
  return (
    <View style={styles.container}>
      <DinoHeader />

      <View style={styles.cuadroRojo} />

      <Text style={styles.texto}>
        ROJO
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cuadroRojo: {
    width: 150,
    height: 150,
    backgroundColor: "red",
    borderRadius: 20,
  },

  texto: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
  },
});