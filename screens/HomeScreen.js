import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { UserContext } from "../context/UserContext";
import DinoHeader from "../components/DinoHeader";

export default function HomeScreen({ navigation }) {
  const { setNombre, setEdad, setDinoElegido } = useContext(UserContext);
  
  const [inputNombre, setInputNombre] = useState("");
  const [inputEdad, setInputEdad] = useState("");
  
  // Controla si estamos en el paso 1 (Datos) o paso 2 (Elegir Dino)
  const [paso, setPaso] = useState(1);
  const [dinoSeleccionado, setDinoSeleccionado] = useState("dino_verde");

  // Mapeo de los 6 dinos de tu imagen (asegúrate de guardarlos en tus assets)
  const listaDinos = [
    { id: "dino_celeste_cresta", img: require("../assets/dino_celeste_cresta.png"), color: "#E3F2FD" },
    { id: "dino_amarillo", img: require("../assets/dino_amarillo.png"), color: "#FFFDE7" },
    { id: "dino_triceratops", img: require("../assets/dino_triceratops.png"), color: "#FFE0B2" },
    { id: "dino_verde", img: require("../assets/dino_verde.png"), color: "#E8F5E9" },
    { id: "dino_azul_cuello", img: require("../assets/dino_azul_cuello.png"), color: "#E0F7FA" },
    { id: "dino_chocolate", img: require("../assets/dino_chocolate.jpg"), color: "#E0F2F1" },
  ];

  const handleSiguientePaso = () => {
    if (inputNombre.trim() === "") setNombre("Amiguito");
    else setNombre(inputNombre);

    if (inputEdad.trim() === "") setEdad("4");
    else setEdad(inputEdad);

    Keyboard.dismiss();
    setPaso(2); // Pasamos a la selección de personaje
  };

  const handleFinalizar = () => {
    setDinoElegido(dinoSeleccionado);
    navigation.navigate("Menu"); // ¡Nos vamos a jugar!
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
          <DinoHeader />

          {/* VISTA 1: REGISTRO DE DATOS */}
          {paso === 1 && (
            <View style={styles.cardContainer}>
              <Text style={styles.subtitulo}>¿Cómo te llamas?</Text>
              <TextInput
                style={styles.input}
                placeholder="Escribe tu nombre..."
                placeholderTextColor="#90A4AE"
                value={inputNombre}
                onChangeText={setInputNombre}
                maxLength={12}
                autoCapitalize="words"
              />

              <Text style={styles.subtitulo}>¿Cuántos años tienes?</Text>
              <TextInput
                style={styles.input}
                placeholder="Escribe tu edad..."
                placeholderTextColor="#90A4AE"
                value={inputEdad}
                onChangeText={setInputEdad}
                maxLength={2}
                keyboardType="number-pad"
              />

              <TouchableOpacity
                style={styles.botonSiguiente}
                onPress={handleSiguientePaso}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBoton}>SIGUIENTE </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* VISTA 2: SELECCIÓN DEL DINOSAURIO */}
          {paso === 2 && (
            <View style={styles.cardContainer}>
              <Text style={styles.tituloSeleccion}>¡Elige tu Dino amigo! 🦖</Text>
              <Text style={styles.subtituloSeleccion}>Toca el que más te guste:</Text>

              {/* Grid de 2 columnas para mostrar los 6 dinos */}
              <View style={styles.gridDinos}>
                {listaDinos.map((dino) => {
                  const esElegido = dinoSeleccionado === dino.id;
                  return (
                    <TouchableOpacity
                      key={dino.id}
                      style={[
                        styles.tarjetaDino,
                        { backgroundColor: dino.color },
                        esElegido && styles.tarjetaDinoSeleccionada,
                      ]}
                      onPress={() => setDinoSeleccionado(dino.id)}
                      activeOpacity={0.7}
                    >
                      <Image source={dino.img} style={styles.imagenDino} />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={styles.botonJugar}
                onPress={handleFinalizar}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBoton}>¡VAMOS A JUGAR! 🚀</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 35,
    padding: 22,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  subtitulo: {
    fontSize: 19,
    fontWeight: "900",
    color: "#FF5722",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    height: 52,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#37474F",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#CFD8DC",
    marginBottom: 18,
  },
  botonSiguiente: {
    backgroundColor: "#2196F3",
    width: "100%",
    height: 58,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#1565C0",
    marginTop: 10,
  },
  botonJugar: {
    backgroundColor: "#4CAF50",
    width: "100%",
    height: 58,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#388E3C",
    marginTop: 5,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  // Estilos del selector de personajes
  tituloSeleccion: {
    fontSize: 22,
    fontWeight: "900",
    color: "#2E7D32",
    textAlign: "center",
  },
  subtituloSeleccion: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#78909C",
    marginBottom: 15,
  },
  gridDinos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  tarjetaDino: {
    width: "30%", // 3 columnas perfectas
    aspectRatio: 0.85, // Un pelín más alto que ancho
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "transparent",
    elevation: 2,
  },
  tarjetaDinoSeleccionada: {
    borderColor: "#FF9100", // Borde naranja brillante al estar seleccionado
    borderWidth: 4,
    transform: [{ scale: 1.05 }],
  },
  imagenDino: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },
});