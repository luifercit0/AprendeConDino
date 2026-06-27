import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DinoHeader from "../components/DinoHeader";
import StarCounter from "../components/StarCounter";
import { ScoreContext } from "../context/ScoreContext";

export default function ColoresScreen({ navigation }) {
  const { addStar, addFiveStars } = useContext(ScoreContext);
  
  // Controla si se muestra la guía de aprendizaje o el juego interactivo
  const [mostrarGuia, setMostrarGuia] = useState(true);
  // Controla la pregunta actual en el juego
  const [indicePregunta, setIndicePregunta] = useState(0);

  // Paleta completa de 7 colores con sus figuras de soporte lúdico/accesible
  const catalogoColores = [
    { nombre: "ROJO", hex: "#FF1744", figura: "🔺 Triángulo" },
    { nombre: "AZUL", hex: "#2979FF", figura: "🟦 Cuadrado" },
    { nombre: "AMARILLO", hex: "#FFEA00", figura: "🟡 Círculo", textoOscuro: true },
    { nombre: "VERDE", hex: "#00E676", figura: "💚 Corazón" },
    { nombre: "NARANJA", hex: "#FF9100", figura: "⭐ Estrella" },
    { nombre: "MORADO", hex: "#D500F9", figura: "🔷 Rombo" },
    { nombre: "ROSA", hex: "#FF4081", figura: "🌸 Flor" },
  ];

  // Estructura de las preguntas del juego
  // Cada una muestra una figura de color y ofrece 3 opciones de respuesta
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
  // Buscamos los datos visuales reales del color correcto para pintarlo en la tarjeta
  const datosColorCorrecto = catalogoColores.find(c => c.nombre === preguntaActual.correcto);

  const verificarRespuesta = (opcionSeleccionada) => {
    if (opcionSeleccionada === preguntaActual.correcto) {
      // Suma una estrella por respuesta correcta
      addStar(); 

      if (indicePregunta < preguntas.length - 1) {
        setIndicePregunta(indicePregunta + 1);
      } else {
        // Al completar todas las preguntas, premio gordo de 5 estrellas extras y sale al menú
        addFiveStars();
        navigation.navigate("Menu");
      }
    } else {
      // Un aviso sutil e infantil si falla, invitándolo a reintentarlo sin castigarlo
      Alert.alert("¡Casi! 🤭", "¡Inténtalo otra vez, tú puedes!", [{ text: "¡Vale!" }]);
    }
  };

  // 1. VISTA: GUÍA DE APRENDIZAJE INICIAL (ASOCIACIÓN)
  if (mostrarGuia) {
    return (
      <View style={[styles.container, { backgroundColor: "#FFFDE7" }]}>
        <DinoHeader />
        
        <View style={styles.tarjetaCard}>
          <Text style={styles.tituloSeccion}>¡Mira y Aprende! 🎨</Text>
          <Text style={styles.subtituloSeccion}>Cada figura tiene un color mágico:</Text>
          
          <View style={styles.gridGuia}>
            {catalogoColores.map((col, index) => (
              <View key={index} style={styles.itemGuia}>
                {/* Divide la figura para mostrar solo el emoji en grande */}
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

  // 2. VISTA: JUEGO TRIVIA / INTERACTIVO
  return (
    <View style={[styles.container, { backgroundColor: "#E3F2FD" }]}>
      <StarCounter />
      <DinoHeader />

      <View style={styles.tarjetaCard}>
        <Text style={styles.preguntaTexto}>¿Qué color es este? 🤔</Text>
        
        {/* Mostramos la figura pintada del color correcto */}
        <View style={[styles.contenedorFiguraJuego, { backgroundColor: datosColorCorrecto.hex }]}>
          <Text style={styles.figuraJuegoEmoji}>{preguntaActual.figuraIcono}</Text>
        </View>

        {/* Bloque de opciones en forma de botones grandes y fáciles de pulsar */}
        <View style={styles.contenedorOpciones}>
          {preguntaActual.opciones.map((opcion, index) => {
            // Buscamos el color de cada botón según la opción para hacerlo visual
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

      {/* Botón opcional para salir o volver a repasar si el niño se frustra */}
      <TouchableOpacity 
        style={styles.botonSalir} 
        onPress={() => { setMostrarGuia(true); setIndicePregunta(0); }}
      >
        <Text style={styles.textoBotonSalir}>⬅️ Volver a mirar las figuras</Text>
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
  
  // Estilos del estado del juego
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