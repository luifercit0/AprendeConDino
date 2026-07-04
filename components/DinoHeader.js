import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DinoHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Aprende con Dino</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#2E7D32",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
