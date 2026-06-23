import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function DinoGameScreen() {
  const [puntos, setPuntos] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Alimenta a Dino
      </Text>

      <Text style={styles.puntos}>
        ⭐ {puntos}
      </Text>

      <TouchableOpacity
        onPress={() => setPuntos(puntos + 1)}
      >
        <Text style={styles.manzana}>
          🍎
        </Text>
      </TouchableOpacity>

      <Text style={styles.instruccion}>
        Toca la manzana para alimentar a Dino
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

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },

  puntos: {
    fontSize: 24,
    margin: 20,
  },

  manzana: {
    fontSize: 90,
  },

  instruccion: {
    marginTop: 20,
    fontSize: 18,
  },
});