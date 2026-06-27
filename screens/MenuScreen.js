import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import StarCounter from "../components/StarCounter"; // Muestra las estrellas acumuladas del niño

export default function MenuScreen({ navigation }) {
  
  // Definimos las tarjetas del menú con colores vibrantes e individuales
  const opcionesMenu = [
    { id: "letras", titulo: "Letras", icono: "🔤", ruta: "Letras", color: "#FF5722", baseColor: "#E64A19" }, // Naranja
    { id: "numeros", titulo: "Números", icono: "🔢", ruta: "Numeros", color: "#2196F3", baseColor: "#1976D2" }, // Azul
    { id: "colores", titulo: "Colores", icono: "🎨", ruta: "Colores", color: "#9C27B0", baseColor: "#7B1FA2" }, // Morado
    { id: "dino", titulo: "Juego Dino", icono: "🎮", ruta: "DinoGame", color: "#4CAF50", baseColor: "#388E3C" }, // Verde
  ];

  return (
    <View style={styles.container}>
      {/* Contador de estrellas superior */}
      <StarCounter />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.titulo}>¿Qué quieres aprender hoy?</Text>

        {/* Contenedor en cuadrícula (Grid) de 2 columnas para los juegos */}
        <View style={styles.gridContainer}>
          {opcionesMenu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.tarjetaBoton, 
                { backgroundColor: item.color, borderBottomColor: item.baseColor }
              ]}
              onPress={() => navigation.navigate(item.ruta)}
              activeOpacity={0.85}
            >
              <Text style={styles.iconoTarjeta}>{item.icono}</Text>
              <Text style={styles.textoTarjeta}>{item.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón especial inferior para el Certificado (ocupa todo el ancho disponible) */}
        <TouchableOpacity
          style={[styles.botonCertificado, { backgroundColor: "#FFC107", borderBottomColor: "#FFA000" }]}
          onPress={() => navigation.navigate("Certificado")}
          activeOpacity={0.85}
        >
          <Text style={styles.iconoCertificado}>🏆</Text>
          <Text style={styles.textoCertificado}>¡Mi Certificado!</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDE7", // Un amarillo pastel muy sutil y cálido
  },
  scrollContainer: {
    paddingTop: 100, // Espacio para que no choque con el StarCounter
    paddingHorizontal: 20,
    paddingBottom: 100, // Espacio inferior para que el BottomTabs flotante no tape contenido
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
    width: "46%", // Permite que queden dos botones por fila con espacio en medio
    aspectRatio: 1, // Hace que los botones sean perfectamente cuadrados
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 6, // Efecto 3D de bloque de juguete
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  iconoTarjeta: {
    fontSize: 45,
    marginBottom: 8,
  },
  textoTarjeta: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  botonCertificado: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: 6, // Efecto 3D
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  iconoCertificado: {
    fontSize: 32,
    marginRight: 12,
  },
  textoCertificado: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
});