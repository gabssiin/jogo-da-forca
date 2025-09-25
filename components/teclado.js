import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Teclado({ onLetraPressionada, letrasUsadas }) {
  return (
    <View style={styles.tecladoContainer}>
      {alfabeto.map((letra) => (
        <TouchableOpacity
          key={letra}
          style={[
            styles.botao,
            letrasUsadas.includes(letra) && styles.botaoDesabilitado,
          ]}
          onPress={() => onLetraPressionada(letra)}
          disabled={letrasUsadas.includes(letra)}
        >
          <Text style={styles.textoBotao}>{letra}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tecladoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  botao: {
    backgroundColor: '#054772ff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  botaoDesabilitado: {
    backgroundColor: '#bdc3c7',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});