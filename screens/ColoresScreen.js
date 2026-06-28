import React, { useState, useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Modal } from "react-native";
import DinoHeader from "../components/DinoHeader";
import StarCounter from "../components/StarCounter";
import { ScoreContext } from "../context/ScoreContext";
import { UserContext } from "../context/UserContext"; // 1. Importamos el UserContext
import LottieView from "lottie-react-native"; // 2. Importamos Lottie

export default function ColoresScreen({ navigation }) {
  const { addStar, addFiveStars } = useContext(ScoreContext);
  const { dinoElegido, nombre } = useContext(UserContext); // 3. Extraemos el dino y nombre

  // Controla si se muestra la guía de aprendizaje o el juego interactivo
  const [mostrarGuia, setMostrarGuia] = useState(true);
  // Controla la pregunta actual en el juego
  const [indicePregunta, setIndicePregunta] = useState(0);
  
  // 4. Estados para controlar el modal de la lluvia de estrellas y confeti
  const [mostrarCelebracion, setMostrarCelebracion] = useState(false);
  const celebracionRef = useRef(null);

  // Diccionario para renderizar el Dino correcto
  const imagenesDinos = {
    dino_celeste_cresta: require("../assets/dino_celeste_cresta.png"),
    dino_amarillo: require("../assets/dino_amarillo.png"),
    dino_triceratops: require("../assets/dino_triceratops.png"),
    dino_verde: require("../assets/dino_verde.png"),
    dino_azul_cuello: require("../assets/dino_azul_cuello.png"),
    dino_chocolate: require("../assets/dino_chocolate.jpg"),
  };

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
        // --- ¡EL NIÑO COMPLETÓ TODAS LAS PREGUNTAS! ---
        addFiveStars();
        
        // Activamos la pantalla mágica de celebración
        setMostrarCelebracion(true);
        if (celebracionRef.current) {
          celebracionRef.current.reset();
          celebracionRef.current.play();
        }

        // 3.5 segundos de pura lluvia de estrellas y luego vuelve al menú de forma limpia
        setTimeout(() => {
          setMostrarCelebracion(false);
          setIndicePregunta(0);
          setMostrarGuia(true); // Dejamos listo para que vuelva a iniciar desde la guía
          navigation.navigate("Menu");
        }, 3500);
      }
    } else {
      Alert.alert("¡Casi! 🤭", "¡Inténtalo otra vez, tú puedes!", [{ text: "¡Vale!" }]);
    }
  };

  // 1. VISTA: GUÍA DE APRENDIZAJE INICIAL (ASOCIACIÓN)
  if (mostrarGuia) {
    return (
      <View style={[styles.container, { backgroundColor: "#FFFDE7" }]}>
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

  // 2. VISTA: JUEGO TRIVIA / INTERACTIVO
  return (
    <View style={[styles.container, { backgroundColor: "#E3F2FD" }]}>
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

      {/* --- NUEVO: MODAL DE CELEBRACIÓN CON TU DINO --- */}
      <Modal visible={mostrarCelebracion} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <LottieView
           ref={celebracionRef}
           source={require("../assets/animations/celebracion.json")}
           autoPlay={true} // Forzamos a que arranque solo apenas se abra el modal
           loop={true}     // Lo dejamos en bucle para asegurarnos de ver la animación
          style={styles.celebracionAnimacion}
/>

          {/* Renderiza el Dino que el niño seleccionó al inicio */}
          <Image
            source={imagenesDinos[dinoElegido] || imagenesDinos["dino_verde"]}
            style={styles.dinoFelizImage}
          />

          <View style={styles.tarjetaVictoria}>
            <Text style={styles.tituloVictoria}>¡JUEGO COMPLETADO! 🥳</Text>
            <Text style={styles.subtituloVictoria}>¡Lo hiciste genial, {nombre}! 🌈</Text>
          </View>
        </View>
      </Modal>
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
  // Estilos del Modal de Celebración nuevo
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 20,
  },
  celebracionAnimacion: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  dinoFelizImage: {
    width: 240,
    height: 240,
    resizeMode: "contain",
    marginBottom: 15,
  },
  tarjetaVictoria: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 22,
    alignItems: "center",
    width: "90%",
    elevation: 10,
  },
  tituloVictoria: {
    fontSize: 22,
    fontWeight: "900",
    color: "#4CAF50",
    marginBottom: 6,
  },
  subtituloVictoria: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#546E7A",
    textAlign: "center",
  },
});