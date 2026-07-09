import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Image } from "react-native";
import DinoHeader from "../components/DinoHeader";
import StarCounter from "../components/StarCounter";
import BackToMenuButton from "../components/BackToMenuButton";
import { ScoreContext } from "../context/ScoreContext";

// Ajusta estas rutas según la ubicación real de tus imágenes
const botonLPixel = require("../assets/botonLPixel.png");

// Imágenes de colores - AJUSTA ESTAS RUTAS
const imagenesColores = {
  rojo: require("../assets/rojo.jpg"),
  azul: require("../assets/azul.jpg"),
  amarillo: require("../assets/amarillo.jpg"),
  verde: require("../assets/verde.jpg"),
  naranja: require("../assets/naranja.jpg"),
  morado: require("../assets/morado.jpg"),
  rosa: require("../assets/rosa.jpg"),
};

export default function ColoresScreen({ navigation }) {
  const { addStar, addFiveStars, marcarCompletada } = useContext(ScoreContext);

  const [mostrarGuia, setMostrarGuia] = useState(true);
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [huboError, setHuboError] = useState(false);

  const catalogoColores = [
    { nombre: "ROJO", hex: "#FF1744", imagen: imagenesColores.rojo },
    { nombre: "AZUL", hex: "#2979FF", imagen: imagenesColores.azul },
    { nombre: "AMARILLO", hex: "#FFEA00", imagen: imagenesColores.amarillo, textoOscuro: true },
    { nombre: "VERDE", hex: "#00E676", imagen: imagenesColores.verde },
    { nombre: "NARANJA", hex: "#FF9100", imagen: imagenesColores.naranja },
    { nombre: "MORADO", hex: "#D500F9", imagen: imagenesColores.morado },
    { nombre: "ROSA", hex: "#FF4081", imagen: imagenesColores.rosa },
  ];

  const preguntas = [
    { correcto: "ROJO", opciones: ["AZUL", "ROJO", "VERDE"] },
    { correcto: "AZUL", opciones: ["AZUL", "AMARILLO", "ROSA"] },
    { correcto: "AMARILLO", opciones: ["NARANJA", "MORADO", "AMARILLO"] },
    { correcto: "VERDE", opciones: ["VERDE", "ROJO", "AZUL"] },
    { correcto: "NARANJA", opciones: ["ROSA", "NARANJA", "MORADO"] },
    { correcto: "MORADO", opciones: ["AMARILLO", "VERDE", "MORADO"] },
    { correcto: "ROSA", opciones: ["ROSA", "ROJO", "NARANJA"] },
  ];

  const preguntaActual = preguntas[indicePregunta];
  const datosColorCorrecto = catalogoColores.find(c => c.nombre === preguntaActual.correcto);

  const verificarRespuesta = (opcionSeleccionada) => {
    if (opcionSeleccionada === preguntaActual.correcto) {
      addStar("Colores");

      if (indicePregunta < preguntas.length - 1) {
        setIndicePregunta(indicePregunta + 1);
      } else {
        addFiveStars("Colores");
        marcarCompletada("Colores");
        setIndicePregunta(0);
        setMostrarGuia(true);
        navigation.replace("Felicidades", { tipoJuego: "Colores", huboFallos: huboError });
      }
    } else {
      setHuboError(true);
      Alert.alert("¡Casi! 🤭", "¡Inténtalo otra vez, tú puedes!", [{ text: "¡Vale!" }]);
    }
  };

  if (mostrarGuia) {
    return (
      <View style={[styles.container, { backgroundColor: "#FFFDE7" }]}>
        <BackToMenuButton navigation={navigation} />
        <DinoHeader />

        <View style={styles.tarjetaCard}>
          <Text style={styles.tituloSeccion}>¡Mira y Aprende! </Text>
          <Text style={styles.subtituloSeccion}>Cada figura tiene un color mágico:</Text>

          <View style={styles.gridGuia}>
            {catalogoColores.map((col, index) => (
              <View key={index} style={styles.itemGuia}>
                <Image source={col.imagen} style={styles.imagenGuia} resizeMode="cover" />
                <Text style={[styles.textoItemGuia, { color: col.textoOscuro ? "#E65100" : col.hex }]}>
                  {col.nombre}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={() => setMostrarGuia(false)}
            activeOpacity={0.85}
          >
            <View style={[styles.contenedorFondoColor, { backgroundColor: "#4CAF50" }]}>
              <ImageBackground
                source={botonLPixel}
                resizeMode="stretch"
                style={styles.fondoBotonPrincipal}
                imageStyle={[{ opacity: 0.45, tintColor: "#212121" }]}
              >
                <Text style={styles.textoBotonPrincipal}>¡A JUGAR!</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "#B8E0D2" }]}>
      <BackToMenuButton navigation={navigation} />
      <StarCounter />
      <DinoHeader />

      <View style={styles.tarjetaCard}>
        <Text style={styles.preguntaTexto}>¿Qué color es este? </Text>

        <View style={styles.contenedorFiguraJuego}>
          <Image source={datosColorCorrecto.imagen} style={styles.imagenFiguraJuego} resizeMode="cover" />
        </View>

        <View style={styles.contenedorOpciones}>
          {preguntaActual.opciones.map((opcion, index) => {
            const infoOpcion = catalogoColores.find(c => c.nombre === opcion);
            return (
              <TouchableOpacity
                key={index}
                style={styles.botonOpcion}
                onPress={() => verificarRespuesta(opcion)}
                activeOpacity={0.85}
              >
                <View style={[styles.contenedorFondoColor, { backgroundColor: infoOpcion.hex }]}>
                  <ImageBackground
                    source={botonLPixel}
                    resizeMode="stretch"
                    style={styles.fondoBotonOpcion}
                    imageStyle={[{ opacity: 0.45, tintColor: "#212121" }]}
                  >
                    <Image source={infoOpcion.imagen} style={styles.imagenOpcion} resizeMode="cover" />
                    <Text style={[styles.textoOpcion, infoOpcion.textoOscuro && { color: "#37474F" }]}>
                      {opcion}
                    </Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        style={styles.botonSalir}
        onPress={() => { setMostrarGuia(true); setIndicePregunta(0); }}
      >
        <Text style={styles.textoBotonSalir}> Volver a mirar las figuras</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  tarjetaCard: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 35,
    padding: 20,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tituloSeccion: {
    fontSize: 24,
    fontWeight: "900",
    color: "#2E7D32",
    marginBottom: 5,
  },
  subtituloSeccion: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#78909C",
    marginBottom: 15,
    textAlign: "center",
  },
  gridGuia: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  itemGuia: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 10,
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },
  imagenGuia: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  textoItemGuia: {
    fontSize: 16,
    fontWeight: "900",
  },
  botonPrincipal: {
    width: "100%",
    height: 60,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
  },
  fondoBotonPrincipal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotonPrincipal: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  contenedorFondoColor: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  preguntaTexto: {
    fontSize: 24,
    fontWeight: "900",
    color: "#37474F",
    marginBottom: 20,
  },
  contenedorFiguraJuego: {
    width: 140,
    height: 140,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    marginBottom: 25,
  },
  imagenFiguraJuego: {
    width: "100%",
    height: "100%",
  },
  contenedorOpciones: {
    width: "100%",
  },
  botonOpcion: {
    width: "100%",
    height: 58,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
  },
  fondoBotonOpcion: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imagenOpcion: {
    width: 34,
    height: 34,
    borderRadius: 8,
    marginRight: 10,
  },
  textoOpcion: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  botonSalir: {
    marginTop: 20,
    padding: 10,
  },
  textoBotonSalir: {
    color: "#546E7A",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});