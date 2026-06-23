import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DinoHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.dino}>🦖</Text>
      <Text style={styles.titulo}>
        Aprende con Dino
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },

  dino: {
    fontSize: 60,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
});