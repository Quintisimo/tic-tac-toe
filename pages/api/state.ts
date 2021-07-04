import type { NextApiRequest, NextApiResponse } from "next";
import { isGameOver } from "../../boardState";
import { Player, Board, Res } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body) as { board: Board; player: Player };
    const gameOver = isGameOver(body.board, body.player);
    res.status(200).json(gameOver);
  }
}
