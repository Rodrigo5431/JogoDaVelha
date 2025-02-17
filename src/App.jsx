import "./App.css";
import React, { useState, useRef, useEffect, useCallback } from "react"; 
import Opcao from "./components/opcao/opcao/Opcao";
import Placar from "./components/opcao/placar/Placar";
import hino_do_flamengo from "./assets/hino-do-flamengo.mp3";
import hino_vasco from "./assets/hino-vasco.mp3";

function App() {
  const jogo = Array(9).fill({ valor: "vazio" });

  const [valores, setValores] = useState(jogo);
  const [jogador, setJogador] = useState(1);
  const [podeJogar, setPodeJogar] = useState(true);
  const [nomeJogador1, setNomeJogador1] = useState("");
  const [nomeJogador2, setNomeJogador2] = useState("");
  const [placar1, setPlacar1] = useState(0);
  const [placar2, setPlacar2] = useState(0);
  const audiofla = useRef(new Audio(hino_do_flamengo));
  const audiovas = useRef(new Audio(hino_vasco));

  const reproduzirAudio = useCallback(() => {
    if (placar1 === 2) {
      audiofla.current.play();
    } else if (placar2 === 2) {
      audiovas.current.play();
    }
  }, [placar1, placar2]);

  function recomecar() {
    setValores(jogo);
    setJogador(1);
    setPodeJogar(true);
  }

  function jogada(jogador, temp) {
    setValores(temp);
    setJogador(jogador);
  }

  const verificaVitoria = useCallback(() => {
    const linhas = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    let jogoEmpatado = true;

    for (const linha of linhas) {
      const [a, b, c] = linha;
      if (
        valores[a].valor === valores[b].valor &&
        valores[b].valor === valores[c].valor &&
        valores[a].valor !== "vazio"
      ) {
        setPodeJogar(false);

        if (valores[a].valor === "player1") {
          alert(`Parabéns, Vitória do ${nomeJogador1}`);
          setPlacar1((prev) => prev + 1);
        } else {
          alert(`Parabéns, Vitória do ${nomeJogador2}`);
          setPlacar2((prev) => prev + 1);
        }

        if (placar1 === 2 || placar2 === 2) {
          alert(`Parabéns ${placar1 === 2 ? nomeJogador1 : nomeJogador2}, você humilhou o adversário!`);
          reproduzirAudio();
          setPlacar1(0);
          setPlacar2(0);
        }
        return;
      }
      if (valores[a].valor === "vazio" || valores[b].valor === "vazio" || valores[c].valor === "vazio") {
        jogoEmpatado = false;
      }
    }

    if (jogoEmpatado) {
      setPodeJogar(false);
      alert("VELHA!");
    }
  }, [valores, placar1, placar2, nomeJogador1, nomeJogador2, reproduzirAudio]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      verificaVitoria();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [valores, verificaVitoria]);

  useEffect(() => {
    const nome1 = prompt("Digite o nome do Jogador 1:") || "Jogador 1";
    const nome2 = prompt("Digite o nome do Jogador 2:") || "Jogador 2";
    setNomeJogador1(nome1);
    setNomeJogador2(nome2);
  }, []);

  function aoClicar(index) {
    if (!podeJogar || valores[index].valor !== "vazio") {
      alert("Jogada inválida!");
      return;
    }

    const temp = [...valores];
    temp[index] = { valor: jogador === 1 ? "player1" : "player2" };
    jogada(jogador === 1 ? 2 : 1, temp);
  }

  return (
    <div>
      <section className="container">
        <h1>JOGO DA VELHA</h1>
      </section>

      <Placar player1={nomeJogador1} player2={nomeJogador2} placar1={placar1} placar2={placar2} />

      <section className="tabuleiro">
        {valores.map((item, index) => (
          <Opcao key={index} aoClicar={() => aoClicar(index)} item={item} />
        ))}
      </section>

      <footer>
        <button onClick={recomecar} className="reset">Recomeçar</button>
      </footer>
    </div>
  );
}

export default App;