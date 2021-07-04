import Head from "next/head";
import { useState, useEffect } from "react";
import produce from "immer";
import clsx from "clsx";
import { AllStates, Player, Res } from "../types";

// Size of tic-tac-toe board and intial state
const intialBoardState = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => "" as AllStates)
);

export default function Home() {
  const [board, setBoard] = useState(intialBoardState);
  const [turn, setTurn] = useState<Player>("X");
  const [message, setMessage] = useState("");
  const [over, setOver] = useState(false);
  const [won, setWon] = useState<Res["won"]>({});

  useEffect(() => {
    // Determine the player that just played to move
    const prevPlayer = turn === "X" ? "O" : "X";

    // Check if the player was the winner or if the game is a draw
    fetch("/api/state", {
      method: "POST",
      body: JSON.stringify({ board, player: prevPlayer }),
    })
      .then((res) => res.json())
      .then((res: Res) => {
        if (res.won || res.over) {
          setMessage(res.message);
          setWon(res.won);
          setOver(true);
        }
        console.log(res);
      })
      .catch(() => {
        setMessage("Error evaluating board state. Please start a new game");
        setOver(true);
      });
  }, [board, turn]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen flex items-center justify-center">
        <div>
          <h1 className="text-center uppercase">Player Turn: {turn}</h1>
          {message && <h1 className="text-center uppercase">{message}</h1>}
          <table className="border-2 border-black border-collapse">
            <tbody>
              {board.map((row, i) => (
                <tr className="border-collapse" key={i}>
                  {row.map((col, j) => (
                    <td
                      key={`${i}_${j}`}
                      className={clsx(
                        "h-40 w-40 border-2 border-black text-center text-5xl",
                        col === "" &&
                          !over &&
                          "hover:bg-green-300 cursor-pointer",
                        (won?.vertical === j ||
                          won?.horizontal === i ||
                          (won?.diagonal === 0 && j === i) ||
                          (won?.diagonal === 1 && j === row.length - 1 - i)) &&
                          "bg-green-400"
                      )}
                      onClick={() => {
                        if (col === "" && !over) {
                          setBoard((prev) =>
                            produce(prev, (draft) => {
                              draft[i][j] = turn;
                            })
                          );
                          setTurn((prev) => {
                            if (prev === "X") return "O";
                            return "X";
                          });
                        }
                      }}
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            disabled={!over}
            className="block p-2 bg-red-500 mt-0.5 border-2 border-black mx-auto disabled:opacity-20 uppercase"
            onClick={() => {
              setBoard(intialBoardState);
              setMessage("");
              setWon({});
              setTurn("X");
              setOver(false);
            }}
          >
            New Game
          </button>
        </div>
      </main>
    </>
  );
}
