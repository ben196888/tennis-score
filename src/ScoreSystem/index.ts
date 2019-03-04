export type Score = number;
export type Player = string;
export type Index = 0 | 1;

/**
 * declare Score System methods
 */
export abstract class ScoreSystem {
  public abstract isTie: () => boolean;
  public abstract pointWonBy(p: Player): void;
  public abstract score(): string;
  public abstract winner(): Player | undefined;
}

/**
 * abstract score system class for a two player game
 * score system has methods pointWonByIdx score, isTie, winnerIdx
 */
export abstract class AbstractScoreSystem implements ScoreSystem {
  protected scores: [Score, Score];
  protected players: [Player, Player];
  constructor(p1: Player, p2: Player) {
    if (p1 === p2) {
      throw Error("duplicate player name");
    }
    this.players = [p1, p2];
    this.scores = [0, 0];
  }
  public abstract isTie(): boolean;
  public abstract pointWonBy(player: Player): void;
  public abstract score(): string;
  public abstract winner(): Player | undefined;

  protected getPlayerIdx(player: Player): Index {
    const idx: number = this.players.findIndex((p: Player) => p === player);
    if (idx < 0) {
      throw Error("player not found");
    }

    return idx as Index;
  }
}

export * from "./PointSystem";
export * from "./DeuceSystem";
export * from "./TieBreakSystem";
