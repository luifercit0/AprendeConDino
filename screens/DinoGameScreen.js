import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { ScoreContext } from "../context/ScoreContext";
import { UserContext } from "../context/UserContext";
import StarCounter from "../components/StarCounter";
import BackToMenuButton from "../components/BackToMenuButton";

const META_ACIERTOS = 6;

export default function DinoGameScreen({ navigation }) {
  const { addStar, marcarCompletada } = useContext(ScoreContext);
  const { dinoElegido, nombre } = useContext(UserContext);

  const frutas = [
    { emoji: "🍎", nombre: "Manzana" },
    { emoji: "🍌", nombre: "Plátano" },
    { emoji: "🍉", nombre: "Sandía" },
    { emoji: "🍇", nombre: "Uvas" },
  ];

  const [frutaAntojo, setFrutaAntojo] = useState(frutas[0]);
  const [aciertos, setAciertos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [burbujaTexto, setBurbujaTexto] = useState(`¡Hola ${nombre}! Tengo antojo de una ${frutas[0].nombre} ${frutas[0].emoji}`);

  const escalaDino = useRef(new Animated.Value(1)).current;

  const imagenesDinos = {
    dino_celeste_cresta: require("../assets/dino_celeste_cresta.png"),
    dino_amarillo: require("../assets/dino_amarillo.png"),
    dino_triceratops: require("../assets/dino_triceratops.png"),
    dino_verde: require("../assets/dino_verde.png"),
    dino_azul_cuello: require("../assets/dino_azul_cuello.png"),
    dino_chocolate: require("../assets/dino_chocolate.jpg"),
  };

  const animarDino = () => {
    Animated.sequence([
      Animated.timing(escalaDino, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.spring(escalaDino, { toValue: 1.2, friction: 3, tension: 40, useNativeDriver: true }),
      Animated.timing(escalaDino, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
  };

  const pedirOtraFruta = () => {
    const siguienteFruta = frutas[Math.floor(Math.random() * frutas.length)];
    setFrutaAntojo(siguienteFruta);
    setBurbujaTexto(`¡Ya digerí la comida! Ahora tengo antojo de: ${siguienteFruta.nombre} ${siguienteFruta.emoji}`);
    setBloqueado(false);
  };

  const alimentarA_Dino = (frutaSeleccionada) => {
    if (bloqueado) {
      return;
    }

    setBloqueado(true);
    animarDino();

    if (frutaSeleccionada.nombre === frutaAntojo.nombre) {
      const nuevosAciertos = aciertos + 1;
      setAciertos(nuevosAciertos);
      addStar();
      setBurbujaTexto(`¡Siii! ¡Le atinaste, ${nombre}! Me fascinan las ${frutaSeleccionada.nombre}s 😋`);

      if (nuevosAciertos >= META_ACIERTOS) {
        marcarCompletada("DinoGame");
        setTimeout(() => {
          navigation.replace("Felicidades", { tipoJuego: "DinoGame" });
        }, 1200);
        return;
      }
    } else {
      addStar();
      setBurbujaTexto(`¡Gracias! La ${frutaSeleccionada.nombre} está rica, pero yo buscaba una ${frutaAntojo.nombre} 🤭`);
    }

    setTimeout(pedirOtraFruta, 1800);
  };

  return (
    <View style={styles.container}>
      <BackToMenuButton navigation={navigation} />
      <StarCounter />

      <Text style={styles.titulo}>Alimenta a tu Dino 🌳</Text>
      <Text style={styles.puntos}>⭐ {aciertos} / {META_ACIERTOS}</Text>

      <View style={styles.personajeContainer}>
        <View style={styles.burbuja}>
          <Text style={styles.burbujaTexto}>{burbujaTexto}</Text>
          <View style={styles.burbujaFlecha} />
        </View>

        <Animated.Image
          source={imagenesDinos[dinoElegido] || imagenesDinos["dino_verde"]}
          style={[styles.dinoImagen, { transform: [{ scale: escalaDino }] }]}
        />
      </View>

      <Text style={styles.instruccion}>¡Dale la fruta que Dino está pidiendo!</Text>

      <View style={styles.platoFrutas}>
        {frutas.map((fruta, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.botonFruta, bloqueado && styles.botonBloqueado]}
            onPress={() => alimentarA_Dino(fruta)}
            activeOpacity={0.6}
            disabled={bloqueado}
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
    marginBottom: 4,
    marginTop: 40,
  },
  puntos: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FF8F00",
    marginBottom: 6,
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
  botonBloqueado: {
    opacity: 0.5,
  },
  frutaEmoji: {
    fontSize: 36,
  },
});
