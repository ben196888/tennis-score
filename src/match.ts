export type Player = string;

/**
 * The enum of score system
 * Point system max 4 points, should map to 0, 15, 30, 40
 * Deuce system max inf, should not map
 * TieBreak system max inf, should not map
 */
enum ScoreSystem {
  Point, // max 4
  Deuce, // max inf
  TieBreak // max inf
}

type Point = 0 | 15 | 30 | 40;
const idxToPoint: Point[] = [0, 15, 30, 40];

type Game = number; // 0, 1, 2, ... 6, 7

/**
 * Match includes two player names, points, and games
 */
export class Match {
  private readonly players: [Player, Player];
  private scoreSystem: ScoreSystem;
  private scores: [number, number];
  private readonly games: [Game, Game];

  constructor(playerOne: Player, playerTwo: Player) {
    if (playerOne === playerTwo) {
      throw Error("duplicate player name");
    }
    this.players = [playerOne, playerTwo];
    this.games = [0, 0];
    this.scoreSystem = ScoreSystem.Point;
    this.scores = [0, 0];
  }

  public pointWonBy(player: Player): void {
    const playerIdx: number = this.players.findIndex(
      (p: Player) => p === player
    );
    if (playerIdx < 0) {
      throw Error("player not found");
    }

    this.scores[playerIdx] = this.scores[playerIdx] + 1;

    if (this.scoreSystem === ScoreSystem.Point) {
      // Should change to Deuce system and reset scores
      if (this.scores[0] === 3 && this.scores[1] === 3) {
        this.scoreSystem = ScoreSystem.Deuce;
        this.scores = [0, 0];

        return;
      }

      // When player win the game
      if (this.scores[playerIdx] === 4) {
        this.winGameHanlder(playerIdx);

        return;
      }
      // tie break system and deuce system
    } else if (
      this.scoreSystem === ScoreSystem.TieBreak &&
      Math.max(this.scores[0], this.scores[1]) < 7
    ) {
      // minimum 7 points to win tie break
      return;

      // two poins ahead the opponent to win the game in deuce and tie break
    } else if (Math.abs(this.scores[0] - this.scores[1]) >= 2) {
      // when player win the game in tie break and deuce
      this.winGameHanlder(playerIdx);

      return;
    }
  }

  public score(): string {
    const gameScore = this.getGameScore();
    const pointScore = this.getScore();

    if (pointScore === "") {
      return `${gameScore}`;
    }

    return `${gameScore}, ${pointScore}`;
  }

  private winGameHanlder(playerIdx: number): void {
    this.games[playerIdx] = this.games[playerIdx] + 1;
    // reset score system and scores
    // start the tie break point system when both players won 6 games
    if (this.games.every((g: number) => g === 6)) {
      this.scoreSystem = ScoreSystem.TieBreak;
    } else {
      this.scoreSystem = ScoreSystem.Point;
    }
    this.scores = [0, 0];
  }

  private getScore(): string {
    switch (this.scoreSystem) {
      case ScoreSystem.TieBreak:
        return this.getTieBreakScore();
      case ScoreSystem.Deuce:
        return this.getDeuceScore();
      default:
        return this.getPointScore();
    }
  }

  private getPointScore() {
    // Point system
    if (idxToPoint[this.scores[0]] === 0 && idxToPoint[this.scores[1]] === 0) {
      return "";
    }

    return `${idxToPoint[this.scores[0]]}-${idxToPoint[this.scores[1]]}`;
  }

  private getDeuceScore() {
    if (this.scores[0] === this.scores[1]) {
      return "Deuce";
    }
    if (this.scores[0] > this.scores[1]) {
      return `Advantage ${this.players[0]}`;
    }

    return `Advantage ${this.players[1]}`;
  }

  private getTieBreakScore() {
    if (this.scores[0] === 0 && this.scores[1] === 0) {
      return "";
    }

    return `${this.scores[0]}-${this.scores[1]}`;
  }

  private getGameScore(): string {
    return `${this.games[0]}-${this.games[1]}`;
  }
}
