import React, { useState, useContext, useEffect } from "react";
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
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../context/UserContext";
import DinoHeader from "../components/DinoHeader";

const botonLPixel = require("../assets/botonLPixel.png");

const listaDinos = [
  { id: "dino_celeste_cresta", img: require("../assets/dino_celeste_cresta.png"), color: "#E3F2FD" },
  { id: "dino_amarillo", img: require("../assets/dino_amarillo.png"), color: "#FFFDE7" },
  { id: "dino_triceratops", img: require("../assets/dino_triceratops.png"), color: "#FFE0B2" },
  { id: "dino_verde", img: require("../assets/dino_verde.png"), color: "#E8F5E9" },
  { id: "dino_azul_cuello", img: require("../assets/dino_azul_cuello.png"), color: "#E0F7FA" },
  { id: "dino_chocolate", img: require("../assets/dino_Trex.png"), color: "#E0F2F1" },
];

export default function HomeScreen({ navigation }) {
  const {
    nombre,
    ultimoPuntaje,
    jugadorId,
    cargando,
    registrarJugador,
    iniciarSesion,
  } = useContext(UserContext);

  const [modo, setModo] = useState("inicio");

  const [inputNombre, setInputNombre] = useState("");
  const [inputEdad, setInputEdad] = useState("");
  const [dinoSeleccionado, setDinoSeleccionado] = useState("dino_verde");

  const [errorLogin, setErrorLogin] = useState("");
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
    if (!cargando && jugadorId) {
      setModo("bienvenida");
    }
  }, [cargando, jugadorId]);

  const handleContinuarBienvenida = () => {
    navigation.navigate("Menu");
  };

  const handleSiguienteRegistro = () => {
    Keyboard.dismiss();
    setModo("registro-dino");
  };

  const handleFinalizarRegistro = async () => {
    const nombreFinal = inputNombre.trim() === "" ? "Amiguito" : inputNombre;
    const edadFinal = inputEdad.trim() === "" ? "4" : inputEdad;

    await registrarJugador(nombreFinal, edadFinal, dinoSeleccionado);
    navigation.navigate("Menu");
  };

  const handleLogin = async () => {
    if (inputNombre.trim() === "" || inputEdad.trim() === "") {
      setErrorLogin("Escribe tu nombre y tu edad para entrar.");
      return;
    }

    setErrorLogin("");
    setBuscando(true);

    const encontrado = await iniciarSesion(inputNombre, inputEdad, dinoSeleccionado);

    setBuscando(false);

    if (encontrado) {
      navigation.navigate("Menu");
    } else {
      setErrorLogin("No encontramos esa Dino cuenta. Revisa tu nombre, tu edad y el dino que elegiste.");
    }
  };

  const volverAlInicio = () => {
    setErrorLogin("");
    setInputNombre("");
    setInputEdad("");
    setDinoSeleccionado("dino_verde");
    setModo("inicio");
  };

  if (cargando) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
          <DinoHeader />

          {modo === "bienvenida" && (
            <View style={styles.cardContainer}>
              <Text style={styles.subtitulo}>¡Hola de nuevo, {nombre}!</Text>
              <Text style={styles.textoPuntaje}>Tu último puntaje fue {ultimoPuntaje} estrellas</Text>

              <TouchableOpacity
                style={styles.botonJugar}
                onPress={handleContinuarBienvenida}
                activeOpacity={0.8}
              >
                <View style={[styles.contenedorFondoColor, { backgroundColor: "#4CAF50" }]}>
                  <ImageBackground
                    source={botonLPixel}
                    resizeMode="stretch"
                    style={styles.fondoBoton}
                    imageStyle={{ opacity: 0.45, tintColor: "#212121" }}
                  >
                    <Text style={styles.textoBoton}>¡SEGUIR JUGANDO!</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {modo === "inicio" && (
            <View style={styles.cardContainer}>
              <Text style={styles.subtitulo}>¿Ya tienes una Dino cuenta?</Text>

              <TouchableOpacity
                style={styles.botonSiguiente}
                onPress={() => setModo("registro-datos")}
                activeOpacity={0.8}
              >
                <View style={[styles.contenedorFondoColor, { backgroundColor: "#2196F3" }]}>
                  <ImageBackground
                    source={botonLPixel}
                    resizeMode="stretch"
                    style={styles.fondoBoton}
                    imageStyle={{ opacity: 0.45, tintColor: "#212121" }}
                  >
                    <Text style={styles.textoBoton}>¡Soy nuevo!</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botonJugar}
                onPress={() => setModo("login")}
                activeOpacity={0.8}
              >
                <View style={[styles.contenedorFondoColor, { backgroundColor: "#4CAF50" }]}>
                  <ImageBackground
                    source={botonLPixel}
                    resizeMode="stretch"
                    style={styles.fondoBoton}
                    imageStyle={{ opacity: 0.45, tintColor: "#212121" }}
                  >
                    <Text style={styles.textoBoton}>Ya tengo mi Dino</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {modo === "registro-datos" && (
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
                onPress={handleSiguienteRegistro}
                activeOpacity={0.8}
              >
                <View style={[styles.contenedorFondoColor, { backgroundColor: "#2196F3" }]}>
                  <ImageBackground
                    source={botonLPixel}
                    resizeMode="stretch"
                    style={styles.fondoBoton}
                    imageStyle={{ opacity: 0.45, tintColor: "#212121" }}
                  >
                    <Text style={styles.textoBoton}>SIGUIENTE</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botonVolver} onPress={volverAlInicio}>
                <Text style={styles.textoVolver}>‹ Volver</Text>
              </TouchableOpacity>
            </View>
          )}

          {modo === "registro-dino" && (
            <View style={styles.cardContainer}>
              <Text style={styles.tituloSeleccion}>¡Elige tu Dino amigo!</Text>
              <Text style={styles.subtituloSeleccion}>Toca el que más te guste:</Text>

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
                onPress={handleFinalizarRegistro}
                activeOpacity={0.8}
              >
                <View style={[styles.contenedorFondoColor, { backgroundColor: "#4CAF50" }]}>
                  <ImageBackground
                    source={botonLPixel}
                    resizeMode="stretch"
                    style={styles.fondoBoton}
                    imageStyle={{ opacity: 0.45, tintColor: "#212121" }}
                  >
                    <Text style={styles.textoBoton}>¡VAMOS A JUGAR!</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botonVolver} onPress={() => setModo("registro-datos")}>
                <Text style={styles.textoVolver}>‹ Volver</Text>
              </TouchableOpacity>
            </View>
          )}

          {modo === "login" && (
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

              <Text style={styles.tituloSeleccion}>¿Cuál era tu Dino?</Text>

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

              {errorLogin ? <Text style={styles.textoError}>{errorLogin}</Text> : null}

              <TouchableOpacity
                style={styles.botonJugar}
                onPress={handleLogin}
                activeOpacity={0.8}
                disabled={buscando}
              >
                <View style={[styles.contenedorFondoColor, { backgroundColor: "#4CAF50" }]}>
                  <ImageBackground
                    source={botonLPixel}
                    resizeMode="stretch"
                    style={styles.fondoBoton}
                    imageStyle={{ opacity: 0.45, tintColor: "#212121" }}
                  >
                    <Text style={styles.textoBoton}>
                      {buscando ? "Buscando..." : "ENTRAR"}
                    </Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botonVolver} onPress={volverAlInicio}>
                <Text style={styles.textoVolver}>‹ Volver</Text>
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
  cargandoContainer: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
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
  textoPuntaje: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
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
    width: "100%",
    height: 58,
    marginTop: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
  },
  botonJugar: {
    width: "100%",
    height: 58,
    marginTop: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
  },
  contenedorFondoColor: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  fondoBoton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botonVolver: {
    marginTop: 15,
    padding: 8,
  },
  textoVolver: {
    color: "#78909C",
    fontSize: 15,
    fontWeight: "bold",
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  textoError: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  tituloSeleccion: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 5,
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
    marginTop: 10,
    marginBottom: 15,
  },
  tarjetaDino: {
    width: "30%",
    aspectRatio: 0.85,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "transparent",
    elevation: 2,
  },
  tarjetaDinoSeleccionada: {
    borderColor: "#FF9100",
    borderWidth: 4,
    transform: [{ scale: 1.05 }],
  },
  imagenDino: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },
});