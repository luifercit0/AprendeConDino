import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import DinoHeader from "../components/DinoHeader";
import StarCounter from "../components/StarCounter";
import BackToMenuButton from "../components/BackToMenuButton";
import { ScoreContext } from "../context/ScoreContext";

const preguntas = [
  {
    letra: "A",
    emoji: "✈️",
    palabra: "Avión",
    correcta: "A",
    opciones: ["A", "M", "P"],
  },
  {
    letra: "B",
    emoji: "🚢",
    palabra: "Barco",
    correcta: "B",
    opciones: ["B", "R", "T"],
  },
  {
    letra: "C",
    emoji: "🏠",
    palabra: "Casa",
    correcta: "C",
    opciones: ["C", "D", "F"],
  },
];

export default function LetrasScreen({ navigation }) {
  const [indice, setIndice] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const { addStar, marcarCompletada } = useContext(ScoreContext);

  const pregunta = preguntas[indice];

  const verificar = (opcion) => {
    if (opcion === pregunta.correcta) {
      addStar();
      setMensaje("⭐ ¡Correcto!");
    } else {
      setMensaje("❌ Intenta nuevamente");
    }
  };

  const siguiente = () => {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setMensaje("");
    } else {
      marcarCompletada("Letras");
      navigation.replace("Felicidades", { tipoJuego: "Letras" });
    }
  };

  return (
    <View style={styles.container}>
      <BackToMenuButton navigation={navigation} />
      <StarCounter />

      <DinoHeader />

      <Text style={styles.letra}>
        {pregunta.letra}
      </Text>

      <Text style={styles.emoji}>
        {pregunta.emoji}
      </Text>

      <Text style={styles.palabra}>
        {pregunta.letra} de {pregunta.palabra}
      </Text>

      <Text style={styles.pregunta}>
        ¿Cuál es la letra correcta?
      </Text>

      {pregunta.opciones.map((opcion, index) => (
        <TouchableOpacity
          key={index}
          style={styles.boton}
          onPress={() => verificar(opcion)}
        >
          <Text style={styles.textoBoton}>
            {opcion}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.mensaje}>
        {mensaje}
      </Text>

      <TouchableOpacity
        style={styles.siguiente}
        onPress={siguiente}
      >
        <Text style={styles.textoBoton}>
          Siguiente
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  letra: {
    fontSize: 80,
    fontWeight: "bold",
  },

  emoji: {
    fontSize: 60,
  },

  palabra: {
    fontSize: 28,
    marginBottom: 15,
  },

  pregunta: {
    fontSize: 20,
    marginBottom: 15,
  },

  boton: {
    backgroundColor: "#81D4FA",
    width: 150,
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },

  textoBoton: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  mensaje: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
  },

  siguiente: {
    backgroundColor: "#4CAF50",
    marginTop: 20,
    padding: 12,
    borderRadius: 15,
    width: 170,
  },
});
