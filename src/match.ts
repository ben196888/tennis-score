export type Player = string;

type PointIdx = number;
type Point = 0 | 15 | 30 | 40;
const idxToPoint: Point[] = [0, 15, 30, 40];

type Deuce = number; // 0, 1, 2, ...

type Game = number; // 0, 1, 2, ... 6, 7

/**
 * Match includes two player names, points, and games
 */
export class Match {
  private readonly players: [Player, Player];
  private pointIdxs: [PointIdx, PointIdx];
  private dueces: [Deuce, Deuce];
  private readonly games: [Game, Game];
  private tieBreak: boolean;

  constructor(playerOne: Player, playerTwo: Player) {
    if (playerOne === playerTwo) {
      throw Error("duplicate player name");
    }
    this.players = [playerOne, playerTwo];
    this.pointIdxs = [0, 0];
    this.games = [0, 0];
    this.dueces = [0, 0]; // The tie break scoring is similar to duece
    this.tieBreak = false;
  }

  public pointWonBy(player: Player): void {
    const playerIdx: number = this.players.findIndex(
      (p: Player) => p === player
    );
    if (playerIdx < 0) {
      throw Error("player not found");
    }

    // The tie break scoring is similar to duece
    // except tie break has a minimum 7 to win
    if (this.tieBreak || this.isDeuce()) {
      this.dueces[playerIdx] = this.dueces[playerIdx] + 1;

      // when player win the game
      if (Math.abs(this.dueces[0] - this.dueces[1]) >= 2) {
        // player doesn't win the game when tie break point is less then 7
        if (this.tieBreak && Math.max(this.dueces[0], this.dueces[1]) < 7) {
          return;
        }
        this.games[playerIdx] = this.games[playerIdx] + 1;
        // reset deuce and point index
        this.dueces = [0, 0];
        this.pointIdxs = [0, 0];

        this.postGameWinningHanlder();
      }

      return;
    }

    this.pointIdxs[playerIdx] = this.pointIdxs[playerIdx] + 1;

    // when player win the game
    if (this.pointIdxs[playerIdx] === idxToPoint.length) {
      this.games[playerIdx] = this.games[playerIdx] + 1;
      // reset point index
      this.pointIdxs = [0, 0];

      this.postGameWinningHanlder();
    }
  }

  public score(): string {
    const gameScore = this.getGameScore();
    const pointScore = this.getPointScore();

    if (pointScore === "") {
      return `${gameScore}`;
    }

    return `${gameScore}, ${pointScore}`;
  }

  private postGameWinningHanlder(): void {
    // start the tie break point system
    if (this.games.every((g: number) => g === 6)) {
      this.tieBreak = true;
    }
  }

  private isDeuce(): boolean {
    return (
      idxToPoint[this.pointIdxs[0]] === 40 &&
      idxToPoint[this.pointIdxs[1]] === 40
    );
  }

  private getPointScore(): string {
    if (this.tieBreak) {
      return this.getTieBreakScore();
    }

    if (this.isDeuce()) {
      return this.getDueceScore();
    }

    if (
      idxToPoint[this.pointIdxs[0]] === 0 &&
      idxToPoint[this.pointIdxs[1]] === 0
    ) {
      return "";
    }

    return `${idxToPoint[this.pointIdxs[0]]}-${idxToPoint[this.pointIdxs[1]]}`;
  }

  private getDueceScore(): string {
    if (this.dueces[0] === this.dueces[1]) {
      return "Deuce";
    }

    if (this.dueces[0] > this.dueces[1]) {
      return `Advantage ${this.players[0]}`;
    }

    return `Advantage ${this.players[1]}`;
  }

  private getTieBreakScore(): string {
    if (this.dueces.every((d: number) => d === 0)) {
      return "";
    }

    return `${this.dueces[0]}-${this.dueces[1]}`;
  }

  private getGameScore(): string {
    return `${this.games[0]}-${this.games[1]}`;
  }
}
