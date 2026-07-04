import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { ScoreContext } from "../context/ScoreContext";

const felicidadesGif = require("../assets/felicidades.gif");

const MENSAJES = {
  Letras: "¡Aprendiste todas las letras!",
  Numeros: "¡Ya conoces los números!",
  Colores: "¡Dominas todos los colores!",
  DinoGame: "¡Ganaste el juego del Dino!",
};

export default function FelicidadesScreen({ navigation, route }) {
  const { stars, todoCompletado } = useContext(ScoreContext);
  const { tipoJuego = "Menu" } = route.params || {};

  const mensajePersonalizado = MENSAJES[tipoJuego] || "¡Completaste la actividad!";

  useEffect(() => {
    if (todoCompletado) {
      const timer = setTimeout(() => {
        navigation.replace("Certificado");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [todoCompletado]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>¡Felicidades!</Text>
        <Text style={styles.subtitulo}>{mensajePersonalizado}</Text>

        <Image source={felicidadesGif} style={styles.gif} resizeMode="contain" />

        <Text style={styles.estrellas}>⭐⭐⭐⭐⭐</Text>

        {todoCompletado ? (
          <Text style={styles.mensaje}>
            ¡Completaste todas las actividades!{"\n"}Tu certificado te espera...
          </Text>
        ) : (
          <>
            <Text style={styles.mensaje}>¡Eres un campeón! Sigue así.</Text>

            <TouchableOpacity
              style={[styles.boton, styles.botonReintentar]}
              onPress={() => navigation.replace(tipoJuego)}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBoton}>Intentar de nuevo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.boton, styles.botonMenu]}
              onPress={() => navigation.navigate("Menu")}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBoton}>Volver al menú</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.puntaje}>Estrellas totales: {stars}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFDE7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 35,
    padding: 25,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FF9100",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#37474F",
    marginBottom: 10,
    textAlign: "center",
  },
  gif: {
    width: 200,
    height: 200,
    marginVertical: 8,
  },
  estrellas: {
    fontSize: 30,
    marginBottom: 12,
  },
  mensaje: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#546E7A",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  boton: {
    width: "100%",
    height: 56,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    marginBottom: 12,
  },
  botonReintentar: {
    backgroundColor: "#2196F3",
    borderBottomColor: "#1565C0",
  },
  botonMenu: {
    backgroundColor: "#4CAF50",
    borderBottomColor: "#388E3C",
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  puntaje: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#90A4AE",
  },
});
