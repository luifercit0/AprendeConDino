import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import { UserContext } from "../context/UserContext";
import { ScoreContext } from "../context/ScoreContext";
import DinoHeader from "../components/DinoHeader";

export default function ProfileScreen() {
  const { nombre, edad, dinoElegido } = useContext(UserContext);
  const { stars } = useContext(ScoreContext);

  // Mapeo idéntico de imágenes para renderizar el Dino correcto que se guardó en el contexto
  const imagenesDinos = {
    dino_celeste_cresta: require("../assets/dino_celeste_cresta.png"),
    dino_amarillo: require("../assets/dino_amarillo.png"),
    dino_triceratops: require("../assets/dino_triceratops.png"),
    dino_verde: require("../assets/dino_verde.png"),
    dino_azul_cuello: require("../assets/dino_azul_cuello.png"),
    dino_chocolate: require("../assets/dino_chocolate.jpg"),
  };

  // Determinar rango, medalla emoji y color de acento según estrellas
  let rango = "Explorador ";
  let colorRango = "#2196F3"; // Azul
  if (stars >= 5 && stars < 15) {
    rango = "Aventurero";
    colorRango = "#FF9800"; // Naranja
  } else if (stars >= 15) {
    rango = "Maestro Dino ";
    colorRango = "#4CAF50"; // Verde
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <DinoHeader />

      <Text style={styles.titulo}>Mi Perfil de Explorador</Text>

      {/* TARJETA PRINCIPAL (Estilo Carnet Oficial) */}
      <View style={styles.tarjetaPerfil}>
        
        {/* Contenedor del Avatar (El Dino elegido por el niño) */}
        <View style={[styles.avatarContainer, { backgroundColor: colorRango + "15" }]}>
          <Image 
            source={imagenesDinos[dinoElegido] || imagenesDinos["dino_verde"]} 
            style={styles.avatarDino} 
          />
        </View>

        {/* Nombre del Niño en letras gigantes */}
        <Text style={styles.nombreTexto}>{nombre}</Text>
        
        {/* Edad en formato de etiqueta divertida */}
        <View style={styles.etiquetaEdad}>
          <Text style={styles.etiquetaEdadTexto}>🎉 {edad} añitos</Text>
        </View>

        <View style={styles.divisor} />

        {/* Sección de Logros (Estrellas acumuladas) */}
        <View style={styles.filaLogro}>
          <Text style={styles.estrellaIcono}>⭐</Text>
          <View style={styles.infoLogroTexto}>
            <Text style={styles.numeroEstrellas}>{stars}</Text>
            <Text style={styles.subtextoEstrellas}>Estrellas ganadas</Text>
          </View>
        </View>

        {/* Insignia del Rango Dinámico */}
        <View style={[styles.insigniaRango, { backgroundColor: colorRango }]}>
          <Text style={styles.textoRango}>{rango}</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#E8F9FD", // Manteniendo tu fondo pastel original pero optimizado para scroll
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#37474F",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  tarjetaPerfil: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 35,
    padding: 25,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: "#E0F7FA",
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#B2EBF2",
    overflow: "hidden",
  },
  avatarDino: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  nombreTexto: {
    fontSize: 32,
    fontWeight: "900",
    color: "#263238",
    textAlign: "center",
    textTransform: "capitalize",
  },
  etiquetaEdad: {
    backgroundColor: "#ECEFF1",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 6,
    marginBottom: 15,
  },
  etiquetaEdadTexto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#546E7A",
  },
  divisor: {
    width: "100%",
    height: 2,
    backgroundColor: "#ECEFF1",
    marginVertical: 15,
  },
  filaLogro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  estrellaIcono: {
    fontSize: 45,
    marginRight: 15,
  },
  infoLogroTexto: {
    justifyContent: "center",
  },
  numeroEstrellas: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFB300",
    lineHeight: 38,
  },
  subtextoEstrellas: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#90A4AE",
  },
  insigniaRango: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  textoRango: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});