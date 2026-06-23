import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScoreContext } from "../context/ScoreContext";

export default function StarCounter() {
  const { stars } = useContext(ScoreContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ⭐ {stars}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#FFD54F",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});