import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import { ScoreContext } from "../context/ScoreContext";

export default function StarCounter() {
  const { stars } = useContext(ScoreContext);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/estrella.gif")} style={styles.icono} resizeMode="contain" />
      <Text style={styles.text}>{stars}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 45,
    right: 20,
    backgroundColor: "#FFF9C4",
    borderWidth: 3,
    borderColor: "#FFD54F",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 999,
  },
  icono: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  text: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FF8F00",
  },
});