import { AbstractScoreSystem, Player } from '.';

type Point = 0 | 15 | 30 | 40;
const mapToPoint: Point[] = [0, 15, 30, 40];
/**
 * Point extend from score system
 */
export class PointSystem extends AbstractScoreSystem {
  public pointWonBy(player: Player): void {
    const idx = this.getPlayerIdx(player);
    this.scores[idx] = this.scores[idx] + 1;
  }

  public isTie(): boolean {
    return this.scores.every((s: number) => s === 3);
  }

  public score(): string {
    if (this.scores.every((s: number) => s === 0)) {
      return "";
    }

    return `${mapToPoint[this.scores[0]]}-${mapToPoint[this.scores[1]]}`;
  }

  public winner(): Player | undefined {
    // Player win the 4th point win the game
    if (this.scores[0] === 4) {
      return this.players[0];
    }
    if (this.scores[1] === 4) {
      return this.players[1];
    }

    return undefined;
  }
}
