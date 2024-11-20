import { useState } from "react";
import "./App.css";
import "./index.css";
import confetti from "canvas-confetti";

function App() {
  //array con 9 posiciones vacias
  const [tablero, setTablero] = useState(Array(9).fill(""));

  //objeto con los dos turnos
  const turnos = {
    X: "X",
    O: "O",
  };

  //array con posiciones ganadoras
  const posicionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Array con el turno actual, empieza con la X
  const [turnoActual, setTurnoActual] = useState(turnos.X);

  //variable para manejar si hay ganador o no
  const [ganador, setGanador] = useState(false);
  const [finJuego, setFinJuego] = useState(false);

  //funcion para seteal la celda de posicion
  function setPosicion(index) {
    if (ganador || tablero[index]) {
      return;
    }

    // Crea una copia del tablero actual
    const nuevoTablero = [...tablero];

    // Actualiza la posición específica
    nuevoTablero[index] = turnoActual;

    //seteo el tablero con la nueva posicion
    setTablero(nuevoTablero);

    // Cambia el turno actual
    setTurnoActual(turnoActual === turnos.X ? turnos.O : turnos.X);

    //verifico si hay ganador pasandole el nuevo tablero
    const hayGanador = validarGanador(nuevoTablero);
    if (hayGanador != false) {
      setGanador(true);
      setTurnoActual(hayGanador);
      confetti();
    } else {
      //no hay ganador y el juego termino, verifico en todas las posiciones del tablero

      const hayEmpate = nuevoTablero.every((celda) => celda !== "");
      if (hayEmpate) {
        setFinJuego(true);
      }
    }
  }

  function validarGanador(newTablero) {
    for (const posGanadora of posicionesGanadoras) {
      const [a, b, c] = posGanadora;
      if (
        newTablero[a] &&
        newTablero[a] === newTablero[b] &&
        newTablero[a] === newTablero[c]
      ) {
        return newTablero[a]; // Retorna el ganador (X u O)
      }
    }

    return false; // Si no hay ganador
  }

  function resetTablero() {
    setTablero(Array(9).fill(""));
    setTurnoActual(turnos.X);
    setGanador(false);
    setFinJuego(false);
  }

  return (
    <>
      <h1 className="mt-48">Tablero TATETI</h1>
      <p>Turno actual: {turnoActual}</p>
      <button
        onClick={resetTablero}
        className="border-2 p-2 hover:bg-slate-400"
      >
        Reset
      </button>
      <div className="grid grid-cols-3 max-w-64 m-auto mt-4">
        {tablero.map((valorPosicion, index) => {
          return (
            <div
              key={index}
              className="p-6 border-2 border-white hover:cursor-pointer hover:bg-slate-800"
              onClick={() => setPosicion(index)}
            >
              {valorPosicion}
            </div>
          );
        })}
      </div>
      {ganador ? <p className="mt-4">Ganador: {turnoActual}</p> : null}
      {finJuego ? <p className="mt-4">Fin del juego</p> : null}
    </>
  );
}

export default App;
