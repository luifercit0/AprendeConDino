import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import DinoHeader from "../components/DinoHeader";
import BackToMenuButton from "../components/BackToMenuButton";
import { UserContext } from "../context/UserContext";
import { ScoreContext } from "../context/ScoreContext";

export default function CertificadoScreen({ navigation }) {
  const { nombre } = useContext(UserContext);
  const { stars } = useContext(ScoreContext);

  return (
    <View style={styles.container}>
      <BackToMenuButton navigation={navigation} />
      <DinoHeader />

      <Text style={styles.trofeo}>
        🏆
      </Text>

      <Text style={styles.titulo}>
        ¡FELICIDADES!
      </Text>

      <Text style={styles.texto}>
        {nombre ? nombre : "Eres"} un Super Aprendiz
      </Text>

      <Text style={styles.estrella}>
        ⭐⭐⭐⭐⭐
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
  },

  trofeo: {
    fontSize: 100,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
  },

  texto: {
    fontSize: 24,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  estrella: {
    fontSize: 35,
    marginTop: 20,
  },

  subtexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#90A4AE",
    marginTop: 12,
  },
});
