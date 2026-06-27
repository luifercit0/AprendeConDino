import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ScoreContext } from "../context/ScoreContext";
import StarCounter from "../components/StarCounter";

export default function DinoGameScreen() {
  // Conectamos con el contador global de estrellas
  const { addStar } = useContext(ScoreContext);
  
  // Estado para cambiar la carita/reacción de Dino
  const [dinoExpresion, setDinoExpresion] = useState("🦖");
  // Estado para un mensaje divertido de Dino
  const [burbujaTexto, setBurbujaTexto] = useState("¡Tengo mucha hambre! 🍎");

  // Lista de frutas saludables para el menú de Dino
  const frutas = [
    { emoji: "🍎", nombre: "Manzana" },
    { emoji: "🍌", nombre: "Plátano" },
    { emoji: "🍉", nombre: "Sandía" },
    { emoji: "🍇", nombre: "Uvas" },
  ];

  const alimentarA_Dino = (frutaNombre, frutaEmoji) => {
    // 1. Sumamos la estrella de forma global
    addStar();

    // 2. Cambiamos la expresión de Dino a una feliz/comiendo
    const expresionesFelices = ["😋", "🥰", "🥳"];
    const randomExpresion = expresionesFelices[Math.floor(Math.random() * expresionesFelices.length)];
    setDinoExpresion(randomExpresion);
    
    // 3. Dino dice algo lindo sobre la fruta
    setBurbujaTexto(`¡Yumi! Me encanta la ${frutaNombre} ${frutaEmoji}`);

    // 4. Después de 1.2 segundos, Dino vuelve a su estado normal esperando más comida
    setTimeout(() => {
      setDinoExpresion("🦖");
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Marcador de estrellas flotante */}
      <StarCounter />

      {/* Título del juego */}
      <Text style={styles.titulo}>Alimenta a Dino 🌳</Text>

      {/* Contenedor del Personaje y su Burbuja de diálogo */}
      <View style={styles.personajeContainer}>
        <View style={styles.burbuja}>
          <Text style={styles.burbujaTexto}>{burbujaTexto}</Text>
          <View style={styles.burbujaFlecha} />
        </View>
        
        {/* El dinosaurio gigante que reacciona */}
        <Text style={styles.dino}>{dinoExpresion}</Text>
      </View>

      {/* Instrucción clara */}
      <Text style={styles.instruccion}>¡Toca una fruta para darle de comer!</Text>

      {/* El plato interactivo de frutas (Botones gigantes) */}
      <View style={styles.platoFrutas}>
        {frutas.map((fruta, index) => (
          <TouchableOpacity
            key={index}
            style={styles.botonFruta}
            onPress={() => alimentarA_Dino(fruta.nombre, fruta.emoji)}
            activeOpacity={0.7}
          >
            <Text style={styles.frutaEmoji}>{fruta.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Verde pastel muy suave (ambiente de naturaleza para el Dino)
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2E7D32", // Verde oscuro lúdico
    marginBottom: 10,
    marginTop: 40,
  },
  personajeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    height: 240, // Espacio fijo para que no se mueva la pantalla al cambiar los emojis
  },
  dino: {
    fontSize: 100, // ¡Dino gigante y carismático!
  },
  // Estilos de la burbuja de diálogo estilo cómic infantil
  burbuja: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#81C784",
    maxWidth: 260,
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
  },
  burbujaTexto: {
    fontSize: 16,
    fontWeight: "900",
    color: "#37474F",
    textAlign: "center",
  },
  burbujaFlecha: {
    position: "absolute",
    bottom: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "#FFFFFF", // Hace juego con el fondo blanco de la burbuja
  },
  instruccion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#546E7A",
    textAlign: "center",
    marginBottom: 20,
  },
  // Contenedor de las opciones de comida en fila
  platoFrutas: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#A5D6A7",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
  },
  botonFruta: {
    backgroundColor: "#F1F8E9",
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#C5E1A5",
  },
  frutaEmoji: {
    fontSize: 38,
  },
});