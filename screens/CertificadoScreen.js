import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DinoHeader from "../components/DinoHeader";

export default function CertificadoScreen() {
  return (
    <View style={styles.container}>
      <DinoHeader />

      <Text style={styles.trofeo}>
        🏆
      </Text>

      <Text style={styles.titulo}>
        ¡FELICIDADES!
      </Text>

      <Text style={styles.texto}>
        Eres un Super Aprendiz
      </Text>

      <Text style={styles.estrella}>
        ⭐⭐⭐⭐⭐
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

  trofeo: {
    fontSize: 100,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
  },

  texto: {
    fontSize: 24,
    marginTop: 10,
  },

  estrella: {
    fontSize: 35,
    marginTop: 20,
  },
});