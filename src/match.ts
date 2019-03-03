export type Player = string;

type PointIdx = number;
type Point = 0 | 15 | 30 | 40;
const idxToPoint: Point[] = [0, 15, 30, 40];

type Deuce = number;

type Game = number; // 0, 1, 2, ... 6, 7

/**
 * Match includes two player names, points, and games
 */
export class Match {
  private readonly players: [Player, Player];
  private readonly points: [PointIdx, PointIdx];
  private readonly games: [Game, Game];
  private readonly dueces: [Deuce, Deuce];

  constructor(playerOne: Player, playerTwo: Player) {
    if (playerOne === playerTwo) {
      throw Error("duplicate player name");
    }
    this.players = [playerOne, playerTwo];
    this.points = [0, 0];
    this.games = [0, 0];
    this.dueces = [0, 0];
  }

  public pointWonBy(player: Player): void {
    const playerIdx: number = this.players.findIndex(
      (p: Player) => p === player
    );
    if (playerIdx < 0) {
      throw Error("player not found");
    }

    if (this.isDeuce()) {
      this.dueces[playerIdx] = this.dueces[playerIdx] + 1;

      return;
    }

    this.points[playerIdx] = this.points[playerIdx] + 1;
  }

  public score(): string {
    const gameScore = `${this.games[0]}-${this.games[1]}`;
    const pointScore = this.getPointScore();

    return `${gameScore}, ${pointScore}`;
  }

  private isDeuce(): boolean {
    return (
      idxToPoint[this.points[0]] === 40 && idxToPoint[this.points[1]] === 40
    );
  }

  private getPointScore(): string {
    if (this.isDeuce()) {
      return this.getDueceScore();
    }

    return `${idxToPoint[this.points[0]]}-${idxToPoint[this.points[1]]}`;
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
}
