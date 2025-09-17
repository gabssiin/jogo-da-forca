import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

import Teclado from "../components/teclado";
import Forca from "../components/forca";
import { listaDePalavras } from "../data/palavra";

export default function App() {
  const [palavraSecreta, setPalavraSecreta] = useState<string>("");
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState<string[]>([]);
  const [tentativasErradas, setTentativasErradas] = useState<number>(0);
  const [statusJogo, setStatusJogo] = useState<string>("jogando");

  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  useEffect(() => {
    const checarFimDeJogo = () => {
      if (statusJogo !== "jogando") return;

      const letrasUnicas = [...new Set(palavraSecreta.split(""))];
      const letrasCorretasAdivinhadas = letrasUnicas.filter((letra) =>
        letrasAdivinhadas.includes(letra)
      );

      if (letrasCorretasAdivinhadas.length === letrasUnicas.length) {
        setStatusJogo("vitoria");
      } else if (tentativasErradas >= 6) {
        setStatusJogo("derrota");
      }
    };

    checarFimDeJogo();
  }, [letrasAdivinhadas, tentativasErradas, palavraSecreta, statusJogo]);
  const iniciarNovoJogo = () => {
    const novaPalavra =
      listaDePalavras[Math.floor(Math.random() * listaDePalavras.length)];
    setPalavraSecreta(novaPalavra.toUpperCase());
    setLetrasAdivinhadas([]);
    setTentativasErradas(0);
    setStatusJogo("jogando");
  };

  const handleTentativa = (letra: string) => {
    if (statusJogo !== "jogando") return;

    if (letrasAdivinhadas.includes(letra)) return;

    setLetrasAdivinhadas([...letrasAdivinhadas, letra]);

    if (!palavraSecreta.includes(letra)) {
      setTentativasErradas(tentativasErradas + 1);
    }
  };

  const palavraExibida = palavraSecreta
    .split("")
    .map((letra) => (letrasAdivinhadas.includes(letra) ? letra : "_"))
    .join(" ");

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Forca</Text>

      {statusJogo === "jogando" && (
        <>
          <Forca erros={tentativasErradas} />
          <Text style={styles.palavraExibida}>{palavraExibida}</Text>
          <View style={styles.letrasUsadasContainer}>
            <Text style={styles.letrasUsadasTitulo}>Letras Usadas:</Text>
            <Text style={styles.letrasUsadasTexto}>
              {letrasAdivinhadas.join(", ")}
            </Text>
          </View>
          <Text style={styles.tentativasRestantes}>
            Tentativas restantes: {6 - tentativasErradas}
          </Text>
          <Teclado
            onLetraPressionada={handleTentativa}
            letrasUsadas={letrasAdivinhadas}
          />
        </>
      )}

      {statusJogo === "vitoria" && (
        <View style={styles.mensagemFinalContainer}>
          <Text style={styles.mensagemVitoria}>
            Parabéns, você adivinhou a palavra!
          </Text>
          <Text style={styles.palavraFinal}>{palavraSecreta}</Text>
          <Button title="Reiniciar Jogo" onPress={iniciarNovoJogo} />
        </View>
      )}

      {statusJogo === "derrota" && (
        <View style={styles.mensagemFinalContainer}>
          <Text style={styles.mensagemDerrota}>Você perdeu!</Text>
          <Text style={styles.palavraFinal}>
            A palavra era: {palavraSecreta}
          </Text>
          <Button title="Reiniciar Jogo" onPress={iniciarNovoJogo} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  palavraExibida: {
    fontSize: 30,
    letterSpacing: 8,
    marginVertical: 20,
    fontWeight: "bold",
  },
  letrasUsadasContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  letrasUsadasTitulo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  letrasUsadasTexto: {
    fontSize: 16,
  },
  tentativasRestantes: {
    fontSize: 18,
    marginVertical: 10,
  },
  mensagemFinalContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  mensagemVitoria: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 10,
  },
  mensagemDerrota: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 10,
  },
  palavraFinal: {
    fontSize: 20,
    marginBottom: 20,
  },
});
