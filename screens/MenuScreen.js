import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        ¿Qué quieres aprender?
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Letras")}
      >
        <Text style={styles.texto}>🔤 Letras</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Numeros")}
      >
        <Text style={styles.texto}>🔢 Números</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Colores")}
      >
        <Text style={styles.texto}>🎨 Colores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("DinoGame")}
      >
        <Text style={styles.texto}>🎮 Juego Dino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Certificado")}
      >
        <Text style={styles.texto}>🏆 Certificado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9C4",
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  boton: {
    backgroundColor: "#4CAF50",
    width: 220,
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },

  texto: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});