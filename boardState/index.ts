import { Board, Player, Res } from "../types";

/**
 * Determine if the player has a winning line
 * @param board board state
 * @param player current player
 * @returns whether the player has a winning line and the line index
 */
function winningLine(board: Board, player: Player) {
  const lineStates = board.map((line) => line.every((val) => val === player));
  const winning = lineStates.findIndex((val) => val === true);

  return { won: winning !== -1, winning };
}

/**
 * Determine if the line is a draw
 * @param board board state
 * @returns true if draw otherwise false
 */
function drawLine(board: Board) {
  return board.every((line) => line.includes("X") && line.includes("O"));
}

/**
 * Transpose all possible lines from the board state
 * @param board board state
 * @returns vertical and diagonal lines
 */
function allLines(board: Board) {
  const verticals = board.reduce(
    (prev, cur) => cur.map((_, i) => [...(prev[i] || []), cur[i]]),
    [] as Board
  );
  const leftDiagonal = board.reduce((prev, cur, i) => [...prev, cur[i]], []);
  const rightDiagonal = board.reduce(
    (prev, cur, i) => [...prev, cur[cur.length - 1 - i]],
    []
  );

  return {
    verticals,
    diagonals: [leftDiagonal, rightDiagonal],
  };
}

/**
 * Determine if the player has won the game
 * @param board board state
 * @param player current player
 * @returns winning line and line index
 */
function winning(board: Board, player: Player): Res["won"] {
  const { verticals, diagonals } = allLines(board);
  const horizontal = winningLine(board, player);
  const vertical = winningLine(verticals, player);
  const diagonal = winningLine(diagonals, player);

  if (horizontal.won) return { horizontal: horizontal.winning };
  if (vertical.won) return { vertical: vertical.winning };
  if (diagonal.won) return { diagonal: diagonal.winning };
}

/**
 * Determine if the game is a draw
 * @param board board state
 * @returns true if draw otherwise false
 */
function draw(board: Board) {
  const { verticals, diagonals } = allLines(board);

  const horizontal = drawLine(board);
  const vertical = drawLine(verticals);
  const diagonal = drawLine(diagonals);

  return horizontal && vertical && diagonal;
}

/**
 * Determine if the game is over, a draw or a win
 * @param board board state
 * @param player current player
 * @returns whether game is over, a draw or a win
 */
export function isGameOver(board: Board, player: Player): Res {
  const winner = winning(board, player);
  if (winner) {
    return { message: `${player} won the game`, won: winner, over: true };
  }

  if (draw(board)) {
    return { message: "Its a draw", over: true };
  }

  return { message: "", over: false };
}
