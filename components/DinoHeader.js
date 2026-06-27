import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DinoHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.dino}>🦖</Text>
      </View>
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
  avatarContainer: {
  
    
    // Sombra suave trasera
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dino: {
    fontSize: 55, // Un tamaño ideal y llamativo
  },
  titulo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#2E7D32", // Verde bosque infantil
    textAlign: "center",
    // Un pequeño truco visual: las letras espaciadas un poco se ven más limpias
    letterSpacing: 0.5, 
  },
});