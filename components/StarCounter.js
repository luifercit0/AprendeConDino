import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { ScoreContext } from "../context/ScoreContext";

export default function StarCounter() {
  const { stars } = useContext(ScoreContext);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⭐</Text>
      <Text style={styles.text}>{stars}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // Asegura que no se pegue al notch en dispositivos modernos
    top: Platform.OS === "ios" ? 60 : 45, 
    right: 20,
    backgroundColor: "#FFF9C4", // Amarillo pastel muy suave de fondo
    borderWidth: 3,
    borderColor: "#FFD54F", // Borde amarillo fuerte interactivo
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 25,
    // Efecto de elevación infantil (estilo pegatina/sticker)
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 999, // Asegura que siempre esté por encima del contenido
  },
  emoji: {
    fontSize: 22,
    marginRight: 6,
  },
  text: {
    fontSize: 22,
    fontWeight: "900", // Peso extra para que resalte mucho
    color: "#FF8F00", // Texto café/anaranjado oscuro, más amigable que el negro puro
  },
});