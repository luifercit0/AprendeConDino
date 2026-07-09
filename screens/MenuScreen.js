import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import StarCounter from "../components/StarCounter";

const botonPixel = require("../assets/botonPixel.png");
const botonLPixel = require("../assets/botonLPixel.png");

export default function MenuScreen({ navigation }) {
  // Mantenemos el array con los códigos de color que dan el contraste pixelado
  const opcionesMenu = [
    { id: "letras", titulo: "Letras", icono: require("../assets/letrasIcon.png"), ruta: "Letras", colorFondo: "#1976D2" },
    { id: "numeros", titulo: "Números", icono: require("../assets/numerosIcon.png"), ruta: "Numeros", colorFondo: "#FFC107" },
    { id: "colores", titulo: "Colores", icono: require("../assets/coloresIcon.png"), ruta: "Colores", colorFondo: "#00796B" },
    { id: "dino", titulo: "Juego Dino", icono: require("../assets/dinoIcon.png"), ruta: "DinoGame", colorFondo: "#4CAF50" },
  ];

  return (
    <View style={styles.container}>
      <StarCounter />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>¿Qué quieres aprender hoy?</Text>

        <View style={styles.gridContainer}>
          {opcionesMenu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.tarjetaBoton}
              onPress={() => navigation.navigate(item.ruta)}
              activeOpacity={0.85}
            >
              {/* Envolvemos con el contenedor de color para lograr el efecto texturizado */}
              <View style={[styles.contenedorFondoColor, { backgroundColor: item.colorFondo }]}>
                <ImageBackground
                  source={botonPixel}
                  resizeMode="stretch"
                  style={styles.fondoTarjeta}
                  imageStyle={[styles.imagenTarjeta, { opacity: 0.45, tintColor: "#212121" }]}
                >
                  <Image source={item.icono} style={styles.iconoTarjeta} resizeMode="contain" />
                  <Text style={styles.textoTarjeta}>{item.titulo}</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.botonCertificado}
          onPress={() => navigation.navigate("Certificado")}
          activeOpacity={0.85}
        >
          {/* Contenedor texturizado para el certificado (Púrpura) */}
          <View style={[styles.contenedorFondoColor, { backgroundColor: "#7B1FA2" }]}>
            <ImageBackground
              source={botonLPixel}
              resizeMode="stretch"
              style={styles.fondoCertificado}
              imageStyle={[styles.imagenCertificado, { opacity: 0.45, tintColor: "#212121" }]}
            >
              <Image
                source={require("../assets/certificadoIcon.png")}
                style={styles.iconoCertificado}
                resizeMode="contain"
              />
              <Text style={styles.textoCertificado}>¡Mi Certificado!</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6EADF",
  },
  scrollContainer: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#37474F",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  tarjetaBoton: {
    width: "46%",
    aspectRatio: 1,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
  },
  /* Mantenemos esta clase intacta para recortar el color en los bordes pixelados */
  contenedorFondoColor: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  fondoTarjeta: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  imagenTarjeta: {},
  iconoTarjeta: {
    width: 56,
    height: 56,
    marginBottom: 8,
  },
  textoTarjeta: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  botonCertificado: {
    width: "100%",
    height: 70,
    marginTop: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
  },
  fondoCertificado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  imagenCertificado: {},
  iconoCertificado: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textoCertificado: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
});