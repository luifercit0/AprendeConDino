import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { UserContext } from "../context/UserContext";
import { ScoreContext } from "../context/ScoreContext";

export default function ProfileScreen() {
  const { nombre, edad } = useContext(UserContext);
  const { stars } = useContext(ScoreContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👤 Mi Perfil</Text>

      <Text style={styles.info}>Nombre: {nombre}</Text>

      <Text style={styles.info}>Edad: {edad} años</Text>

      <Text style={styles.info}>⭐ Estrellas: {stars}</Text>

      <Text style={styles.nivel}>
        {stars < 5
          ? "Nivel: Explorador"
          : stars < 15
          ? "Nivel: Aventurero"
          : "Nivel: Maestro Dino"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F9FD",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  info: {
    fontSize: 22,
    marginBottom: 15,
  },

  nivel: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});