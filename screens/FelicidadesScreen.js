import React, { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { ScoreContext } from "../context/ScoreContext";
import { UserContext } from "../context/UserContext";
import LottieView from "lottie-react-native";

const imagenesDinos = {
  dino_celeste_cresta: require("../assets/dino_celeste_cresta.png"),
  dino_amarillo: require("../assets/dino_amarillo.png"),
  dino_triceratops: require("../assets/dino_triceratops.png"),
  dino_verde: require("../assets/dino_verde.png"),
  dino_azul_cuello: require("../assets/dino_azul_cuello.png"),
  dino_chocolate: require("../assets/dino_Trex.png"),
};

const MENSAJES = {
  Letras: "¡Aprendiste todas las letras!",
  Numeros: "¡Ya conoces los números!",
  Colores: "¡Dominas todos los colores!",
  DinoGame: "¡Ganaste el juego del Dino!",
};

export default function FelicidadesScreen({ navigation, route }) {
  const { stars, todoCompletado } = useContext(ScoreContext);
  const { dinoElegido, certificadoObtenido, marcarCertificadoObtenido } = useContext(UserContext);
  const { tipoJuego = "Menu", huboFallos = false } = route.params || {};

  const mensajePersonalizado = MENSAJES[tipoJuego] || "¡Completaste la actividad!";
  const esPrimerCertificado = todoCompletado && !certificadoObtenido;
  const celebracionRef = useRef(null);

  useEffect(() => {
    if (esPrimerCertificado) {
      const timer = setTimeout(async () => {
        await marcarCertificadoObtenido();
        navigation.replace("Certificado");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [esPrimerCertificado]);

  useEffect(() => {
    celebracionRef.current?.reset();
    celebracionRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      {/* Capa de animación por encima con clicks habilitados hacia abajo */}
      <View pointerEvents="none" style={styles.celebracionContenedor}>
        <LottieView
          ref={celebracionRef}
          source={require("../assets/animations/celebracion.json")}
          autoPlay={false}
          loop={false}
          style={styles.lottieEstilo}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tarjeta}>
          <Text style={styles.titulo}>¡Felicidades!</Text>
          <Text style={styles.subtitulo}>{mensajePersonalizado}</Text>

          {/* 1. Primero el Dinosaurio bien centrado */}
          <Image
            source={imagenesDinos[dinoElegido] || imagenesDinos.dino_verde}
            style={styles.dinoImagen}
            resizeMode="contain"
          />

          {/* 2. Ahora evaluamos el mensaje bonito abajo y luego los botones */}
          {esPrimerCertificado ? (
            <>
              <View style={[styles.contenedorMensaje, styles.mensajeCertificado]}>
                <Text style={styles.iconoMensaje}>🏆</Text>
                <Text style={styles.textoMensaje}>
                  ¡Completaste todas las actividades!{"\n"}¡Tu certificado te espera!
                </Text>
              </View>
              {/* Nota: En tu flujo original, si es primer certificado redirige en 2.2 seg, 
                  pero dejamos espacio por si el usuario llega a interactuar */}
            </>
          ) : (
            <>
              {/* Caja de mensaje dinámico estilizada */}
              <View style={[
                styles.contenedorMensaje, 
                huboFallos ? styles.mensajeIntento : styles.mensajeGanador
              ]}>
                
                <Text style={styles.textoMensaje}>
                  {huboFallos ? "¡No te rindas! ¡Practica y lo lograrás!" : "¡Eres un campeón! ¡Lo hiciste increíble!"}
                </Text>
              </View>

              {/* Botones de acción justo debajo del mensaje */}
              <TouchableOpacity
                style={[styles.boton, styles.botonReintentar]}
                onPress={() => navigation.replace(tipoJuego)}
                activeOpacity={0.85}
              >
                <Text style={styles.textoBoton}>Intentar de nuevo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.boton, styles.botonMenu]}
                onPress={() => navigation.navigate("Menu")}
                activeOpacity={0.85}
              >
                <Text style={styles.textoBoton}>Volver al menú</Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={styles.puntaje}>Estrellas totales: {stars}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDE7",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  tarjeta: {
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
  },
  titulo: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FF9100",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#37474F",
    marginBottom: 10,
    textAlign: "center",
  },
  dinoImagen: {
    width: 180,
    height: 180,
    marginVertical: 15,
  },
 
  contenedorMensaje: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
  },
  mensajeGanador: {
    backgroundColor: "#FFF9C4", 
    borderColor: "#FBC02D",
  },
  mensajeIntento: {
    backgroundColor: "#E1F5FE", 
    borderColor: "#0288D1",
  },
  mensajeCertificado: {
    backgroundColor: "#E8F5E9", 
    borderColor: "#388E3C",
  },
  iconoMensaje: {
    fontSize: 28,
    marginRight: 12,
  },
  textoMensaje: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#37474F",
    lineHeight: 22,
  },
  // ----------------------------------------------
  boton: {
    width: "100%",
    height: 56,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    marginBottom: 12,
  },
  botonReintentar: {
    backgroundColor: "#2196F3",
    borderBottomColor: "#1565C0",
  },
  botonMenu: {
    backgroundColor: "#4CAF50",
    borderBottomColor: "#388E3C",
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  puntaje: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#90A4AE",
  },
  celebracionContenedor: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  lottieEstilo: {
    flex: 1,
  },
});