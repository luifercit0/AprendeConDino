import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DinoHeader from "../components/DinoHeader";
import BackToMenuButton from "../components/BackToMenuButton";
import { UserContext } from "../context/UserContext";
import { ScoreContext } from "../context/ScoreContext";

const trofeoGif = require("../assets/trofeo.gif");

export default function CertificadoScreen({ navigation }) {
  const { nombre } = useContext(UserContext);
  const { stars } = useContext(ScoreContext);

  return (
    <View style={styles.container}>
      <BackToMenuButton navigation={navigation} />
      <DinoHeader />

      <Image 
        source={trofeoGif} 
        style={styles.trofeoGif} 
        resizeMode="contain"
      />

      <Text style={styles.titulo}>
        ¡FELICIDADES!
      </Text>

      <Text style={styles.texto}>
        {nombre ? nombre : "Eres"} un Super Aprendiz
      </Text>

      <Text style={styles.subtexto}>
        Estrellas totales: {stars}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDE7",
    paddingHorizontal: 20,
  },

  trofeoGif: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },

  texto: {
    fontSize: 24,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "600",
    color: "#37474F",
  },

  subtexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F00",
    marginTop: 20,
  },
});