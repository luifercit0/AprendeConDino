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
    figuras: "✈️✈️",
    correcta: "2",
    opciones: ["1", "2", "4"],
  },
  {
    figuras: "🍎🍎🍎🍎",
    correcta: "4",
    opciones: ["3", "4", "5"],
  },
  {
    figuras: "⚽⚽⚽⚽⚽",
    correcta: "5",
    opciones: ["4", "5", "6"],
  },
];

export default function NumerosScreen({ navigation }) {
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
      marcarCompletada("Numeros");
      navigation.replace("Felicidades", { tipoJuego: "Numeros" });
    }
  };

  return (
    <View style={styles.container}>
      <BackToMenuButton navigation={navigation} />
      <StarCounter />

      <DinoHeader />

      <Text style={styles.figuras}>
        {pregunta.figuras}
      </Text>

      <Text style={styles.pregunta}>
        ¿Cuántos objetos hay?
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

  figuras: {
    fontSize: 50,
    marginBottom: 20,
  },

  pregunta: {
    fontSize: 22,
    marginBottom: 20,
  },

  boton: {
    backgroundColor: "#FFCC80",
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
