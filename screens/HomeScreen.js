import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { UserContext } from "../context/UserContext";

export default function HomeScreen({ navigation }) {
  const { setNombre, setEdad } = useContext(UserContext);

  const [nombreLocal, setNombreLocal] = useState("");
  const [edadLocal, setEdadLocal] = useState("");

  const comenzar = () => {
    if (!nombreLocal || !edadLocal) {
      alert("Completa tu nombre y edad");
      return;
    }

    setNombre(nombreLocal);
    setEdad(edadLocal);

    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        🦖 Aprende con Dino
      </Text>

      <Text style={styles.dino}>
        🦖
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        value={nombreLocal}
        onChangeText={setNombreLocal}
      />

      <TextInput
        style={styles.input}
        placeholder="Tu edad"
        keyboardType="numeric"
        value={edadLocal}
        onChangeText={setEdadLocal}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={comenzar}
      >
        <Text style={styles.textoBoton}>
          Comenzar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B3E5FC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  dino: {
    fontSize: 90,
    marginBottom: 20,
  },

  input: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 18,
  },

  boton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 15,
    width: "90%",
  },

  textoBoton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});