import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import DinoHeader from "../components/DinoHeader";
import StarCounter from "../components/StarCounter";
import BackToMenuButton from "../components/BackToMenuButton";
import { ScoreContext } from "../context/ScoreContext";

const botonLPixel = require("../assets/botonLPixel.png");

const preguntas = [
  {
    imagen: require("../assets/TwoSpideys.png"),
    objetos: "personas",
    correcta: "2",
    opciones: ["5", "2", "3"],
  },
  {
    imagen: require("../assets/Manzanas.png"),
    objetos: "manzanas",
    correcta: "4",
    opciones: ["4", "0", "8"],
  },
  {
    imagen: require("../assets/Pinguino.png"),
    objetos: "muñecas",
    correcta: "1",
    opciones: ["7", "9", "1"],
  }
];

export default function NumerosScreen({ navigation }) {
  const [indice, setIndice] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [huboError, setHuboError] = useState(false);
  const { addStar, marcarCompletada } = useContext(ScoreContext);
  const pregunta = preguntas[indice];

  const verificar = (opcion) => {
    if (opcion === pregunta.correcta) {
      addStar("Numeros");
      setMensaje("¡Correcto!");
    } else {
      setHuboError(true);
      setMensaje("Intenta nuevamente");
    }
  };

  const siguiente = () => {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setMensaje("");
    } else {
      marcarCompletada("Numeros");
      navigation.replace("Felicidades", { tipoJuego: "Numeros", huboFallos: huboError });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackToMenuButton navigation={navigation} />
      <StarCounter />
      <DinoHeader />

      <Image
        source={pregunta.imagen}
        style={styles.imagen}
        resizeMode="contain"
      />

      <Text style={styles.pregunta}>
        ¿Cuántas {pregunta.objetos.toLowerCase()} hay?
      </Text>

      <View style={styles.opcionesContainer}>
        {pregunta.opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.botonOpcion}
            onPress={() => verificar(opcion)}
            activeOpacity={0.85}
          >
            <View style={[styles.contenedorFondoColor, { backgroundColor: "#FFB74D" }]}>
              <ImageBackground
                source={botonLPixel}
                resizeMode="stretch"
                style={styles.fondoBoton}
                imageStyle={{ opacity: 0.4, tintColor: "#212121" }}
              >
                <Text style={styles.textoOpcion}>{opcion}</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.mensaje}>{mensaje}</Text>

      <TouchableOpacity
        style={styles.botonSiguiente}
        onPress={siguiente}
        activeOpacity={0.85}
      >
        <View style={[styles.contenedorFondoColor, { backgroundColor: "#4CAF50" }]}>
          <ImageBackground
            source={botonLPixel}
            resizeMode="stretch"
            style={styles.fondoBoton}
            imageStyle={{ opacity: 0.4, tintColor: "#212121" }}
          >
            <Text style={styles.textoBotonSiguiente}>SIGUIENTE ➜</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 20,
  },
  imagen: {
    width: 220,
    height: 220,
    marginVertical: 10,
  },
  pregunta: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#37474F",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  opcionesContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 12,
  },
  botonOpcion: {
    width: "100%",
    height: 60,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    borderRadius: 20,
    overflow: "hidden",
  },
  contenedorFondoColor: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  fondoBoton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textoOpcion: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  mensaje: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#37474F",
    textAlign: "center",
    height: 30,
  },
  botonSiguiente: {
    width: 200,
    height: 60,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    borderRadius: 20,
    overflow: "hidden",
  },
  textoBotonSiguiente: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
});