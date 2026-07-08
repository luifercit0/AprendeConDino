import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";

export default function BackToMenuButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.boton}
      onPress={() => navigation.navigate("Menu")}
      activeOpacity={0.8}
    >
      <Text style={styles.texto}>{"‹ Menú"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 45,
    left: 20,
    zIndex: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#CFD8DC",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  texto: {
    fontSize: 15,
    fontWeight: "900",
    color: "#37474F",
  },
});
