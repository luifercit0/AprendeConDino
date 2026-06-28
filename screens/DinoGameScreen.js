import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated, // Importamos Animated para darle vida al Dino
} from "react-native";
import { ScoreContext } from "../context/ScoreContext";
import { UserContext } from "../context/UserContext";
import StarCounter from "../components/StarCounter";

export default function DinoGameScreen() {
  const { addStar } = useContext(ScoreContext);
  const { dinoElegido, nombre } = useContext(UserContext); 

  // --- MECÁNICA DE COGNICIÓN: El antojo de Dino ---
  const frutas = [
    { emoji: "🍎", nombre: "Manzana" },
    { emoji: "🍌", nombre: "Plátano" },
    { emoji: "🍉", nombre: "Sandía" },
    { emoji: "🍇", nombre: "Uvas" },
  ];

  // Dino inicia queriendo una Manzana
  const [frutaAntojo, setFrutaAntojo] = useState(frutas[0]);
  const [burbujaTexto, setBurbujaTexto] = useState(`¡Hola ${nombre}! Tengo antojo de una ${frutas[0].nombre} ${frutas[0].emoji}`);

  // --- ANIMACIÓN: Escala del Dino ---
  const escalaDino = useRef(new Animated.Value(1)).current; // Valor inicial 1 (tamaño normal)

  const imagenesDinos = {
    dino_celeste_cresta: require("../assets/dino_celeste_cresta.png"),
    dino_amarillo: require("../assets/dino_amarillo.png"),
    dino_triceratops: require("../assets/dino_triceratops.png"),
    dino_verde: require("../assets/dino_verde.png"),
    dino_azul_cuello: require("../assets/dino_azul_cuello.png"),
    dino_chocolate: require("../assets/dino_chocolate.jpg"),
  };

  const alimentarA_Dino = (frutaSeleccionada) => {
    // 1. Ejecutar animación de "masticar/brincar" (Se encoge un poquito y luego se agranda)
    Animated.sequence([
      Animated.timing(escalaDino, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.spring(escalaDino, { toValue: 1.2, friction: 3, tension: 40, useNativeDriver: true }),
      Animated.timing(escalaDino, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();

    // 2. Verificar si le dio la fruta que quería
    if (frutaSeleccionada.nombre === frutaAntojo.nombre) {
      addStar(); // Gana su estrella normal (puedes llamar addStar dos veces si quieres premio doble)
      setBurbujaTexto(`¡Siii! ¡Le atinaste, ${nombre}! Me fascinan las ${frutaSeleccionada.nombre}s 😋`);
    } else {
      addStar(); // Igual lo premiamos porque es prekínder y alimentó al Dino, ¡no queremos frustración!
      setBurbujaTexto(`¡Gracias! La ${frutaSeleccionada.nombre} está rica, pero yo buscaba una ${frutaAntojo.nombre} 🤭`);
    }

    // 3. Después de un rato, Dino cambia de antojo aleatoriamente para mantener el juego activo
    setTimeout(() => {
      const siguienteFruta = frutas[Math.floor(Math.random() * frutas.length)];
      setFrutaAntojo(siguienteFruta);
      setBurbujaTexto(`¡Ya digerí la comida! Ahora tengo antojo de: ${siguienteFruta.nombre} ${siguienteFruta.emoji}`);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StarCounter />

      <Text style={styles.titulo}>Alimenta a tu Dino 🌳</Text>

      <View style={styles.personajeContainer}>
        {/* Burbuja de diálogo */}
        <View style={styles.burbuja}>
          <Text style={styles.burbujaTexto}>{burbujaTexto}</Text>
          <View style={styles.burbujaFlecha} />
        </View>
        
        {/* REEMPLAZAMOS Image POR Animated.Image PARA EL EFECTO DE BRINCO */}
        <Animated.Image 
          source={imagenesDinos[dinoElegido] || imagenesDinos["dino_verde"]} 
          style={[styles.dinoImagen, { transform: [{ scale: escalaDino }] }]} 
        />
      </View>

      <Text style={styles.instruccion}>¡Dale la fruta que Dino está pidiendo!</Text>

      {/* Plato de frutas */}
      <View style={styles.platoFrutas}>
        {frutas.map((fruta, index) => (
          <TouchableOpacity
            key={index}
            style={styles.botonFruta}
            onPress={() => alimentarA_Dino(fruta)}
            activeOpacity={0.6}
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
    backgroundColor: "#E8F5E9", 
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#2E7D32", 
    marginBottom: 10,
    marginTop: 40,
  },
  personajeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    height: 300, 
  },
  dinoImagen: {
    width: 210,
    height: 210,
    resizeMode: "contain",
  },
  burbuja: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#81C784",
    maxWidth: 270,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
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
    borderTopColor: "#FFFFFF", 
  },
  instruccion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#546E7A",
    textAlign: "center",
    marginBottom: 20,
  },
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
    fontSize: 36,
  },
});