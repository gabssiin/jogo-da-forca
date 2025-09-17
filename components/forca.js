import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 250,
    position: "relative",
    marginBottom: 20,
  },
  forcaBase: {
    width: 100,
    height: 10,
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
    left: 50,
  },
  forcaVertical: {
    width: 10,
    height: 200,
    backgroundColor: "black",
    position: "absolute",
    bottom: 10,
    left: 100,
  },
  forcaHorizontal: {
    width: 100,
    height: 10,
    backgroundColor: "black",
    position: "absolute",
    top: 30,
    left: 100,
  },
  forcaCorda: {
    width: 10,
    height: 30,
    backgroundColor: "black",
    position: "absolute",
    top: 40,
    left: 190,
  },


  parteBoneco: { position: "absolute", backgroundColor: "black" },
  cabeca: { width: 40, height: 40, borderRadius: 20, top: 70, left: 170 },
  tronco: { width: 10, height: 60, top: 110, left: 185 },
  bracoEsquerdo: {
    width: 40,
    height: 10,
    transform: [{ rotate: "45deg" }],
    top: 120,
    left: 150,
  },
  bracoDireito: {
    width: 40,
    height: 10,
    transform: [{ rotate: "-45deg" }],
    top: 120,
    left: 180,
  },
  pernaEsquerda: {
    width: 40,
    height: 10,
    transform: [{ rotate: "-45deg" }],
    top: 160,
    left: 150,
  },
  pernaDireita: {
    width: 40,
    height: 10,
    transform: [{ rotate: "45deg" }],
    top: 160,
    left: 180,
  },
});

const partes = [
  styles.cabeca,
  styles.tronco,
  styles.bracoEsquerdo,
  styles.bracoDireito,
  styles.pernaEsquerda,
  styles.pernaDireita,
];

export default function Forca({ erros }) {
  return (
    <View style={styles.container}>
      <View style={styles.forcaBase} />
      <View style={styles.forcaVertical} />
      <View style={styles.forcaHorizontal} />
      <View style={styles.forcaCorda} />

      {partes.slice(0, erros).map((parte, index) => (
        <View key={index} style={[styles.parteBoneco, parte]} />
      ))}
    </View>
  );
}
