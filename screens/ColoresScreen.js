import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DinoHeader from "../components/DinoHeader";
import StarCounter from "../components/StarCounter";
import BackToMenuButton from "../components/BackToMenuButton";
import { ScoreContext } from "../context/ScoreContext";

export default function ColoresScreen({ navigation }) {
  const { addStar, addFiveStars, marcarCompletada } = useContext(ScoreContext);

  const [mostrarGuia, setMostrarGuia] = useState(true);
  const [indicePregunta, setIndicePregunta] = useState(0);

  const catalogoColores = [
    { nombre: "ROJO", hex: "#FF1744", figura: "🔺 Triángulo" },
    { nombre: "AZUL", hex: "#2979FF", figura: "🟦 Cuadrado" },
    { nombre: "AMARILLO", hex: "#FFEA00", figura: "🟡 Círculo", textoOscuro: true },
    { nombre: "VERDE", hex: "#00E676", figura: "💚 Corazón" },
    { nombre: "NARANJA", hex: "#FF9100", figura: "⭐ Estrella" },
    { nombre: "MORADO", hex: "#D500F9", figura: "🔷 Rombo" },
    { nombre: "ROSA", hex: "#FF4081", figura: "🌸 Flor" },
  ];

  const preguntas = [
    { correcto: "ROJO", figuraIcono: "🔺", opciones: ["AZUL", "ROJO", "VERDE"] },
    { correcto: "AZUL", figuraIcono: "🟦", opciones: ["AZUL", "AMARILLO", "ROSA"] },
    { correcto: "AMARILLO", figuraIcono: "🟡", opciones: ["NARANJA", "MORADO", "AMARILLO"] },
    { correcto: "VERDE", figuraIcono: "💚", opciones: ["VERDE", "ROJO", "AZUL"] },
    { correcto: "NARANJA", figuraIcono: "⭐", opciones: ["ROSA", "NARANJA", "MORADO"] },
    { correcto: "MORADO", figuraIcono: "🔷", opciones: ["AMARILLO", "VERDE", "MORADO"] },
    { correcto: "ROSA", figuraIcono: "🌸", opciones: ["ROSA", "ROJO", "NARANJA"] },
  ];

  const preguntaActual = preguntas[indicePregunta];
  const datosColorCorrecto = catalogoColores.find(c => c.nombre === preguntaActual.correcto);

  const verificarRespuesta = (opcionSeleccionada) => {
    if (opcionSeleccionada === preguntaActual.correcto) {
      addStar();

      if (indicePregunta < preguntas.length - 1) {
        setIndicePregunta(indicePregunta + 1);
      } else {
        addFiveStars();
        marcarCompletada("Colores");
        setIndicePregunta(0);
        setMostrarGuia(true);
        navigation.replace("Felicidades", { tipoJuego: "Colores" });
      }
    } else {
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
                <Text style={styles.emojiGuia}>{col.figura.split(" ")[0]}</Text>
                <Text style={[styles.textoItemGuia, { color: col.textoOscuro ? "#E65100" : col.hex }]}>
                  {col.nombre}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={() => setMostrarGuia(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotonPrincipal}>¡A JUGAR! 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "#E3F2FD" }]}>
      <BackToMenuButton navigation={navigation} />
      <StarCounter />
      <DinoHeader />

      <View style={styles.tarjetaCard}>
        <Text style={styles.preguntaTexto}>¿Qué color es este? </Text>

        <View style={[styles.contenedorFiguraJuego, { backgroundColor: datosColorCorrecto.hex }]}>
          <Text style={styles.figuraJuegoEmoji}>{preguntaActual.figuraIcono}</Text>
        </View>

        <View style={styles.contenedorOpciones}>
          {preguntaActual.opciones.map((opcion, index) => {
            const infoOpcion = catalogoColores.find(c => c.nombre === opcion);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.botonOpcion,
                  { backgroundColor: infoOpcion.hex, borderBottomColor: infoOpcion.textoOscuro ? "#FFB300" : "#00000020" }
                ]}
                onPress={() => verificarRespuesta(opcion)}
                activeOpacity={0.8}
              >
                <Text style={[styles.textoOpcion, infoOpcion.textoOscuro && { color: "#37474F" }]}>
                  {opcion}
                </Text>
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
    backgroundColor: "#FFFFFF",
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
  emojiGuia: {
    fontSize: 26,
    marginRight: 8,
  },
  textoItemGuia: {
    fontSize: 16,
    fontWeight: "900",
  },
  botonPrincipal: {
    backgroundColor: "#4CAF50",
    width: "100%",
    height: 55,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#388E3C",
  },
  textoBotonPrincipal: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
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
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    marginBottom: 25,
  },
  figuraJuegoEmoji: {
    fontSize: 70,
  },
  contenedorOpciones: {
    width: "100%",
  },
  botonOpcion: {
    width: "100%",
    height: 55,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 4,
    elevation: 3,
  },
  textoOpcion: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
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
