export type Player = "X" | "O";
export type AllStates = "" | Player;
export type Board = ("" | Player)[][];
export type Res = {
  message: string;
  over: boolean;
  won?: Partial<Record<"vertical" | "horizontal" | "diagonal", number>>;
};
