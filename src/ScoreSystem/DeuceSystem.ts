import { AbstractScoreSystem, Player } from '.';

/**
 * Deuce extend from score system
 */
export class DeuceSystem extends AbstractScoreSystem {
  public pointWonBy(player: Player): void {
    const idx = this.getPlayerIdx(player);
    this.scores[idx] = this.scores[idx] + 1;
  }
  public isTie(): boolean {
    return false;
  }
  public score(): string {
    if (this.scores[0] === this.scores[1]) {
      return "Deuce";
    }
    if (this.scores[0] > this.scores[1]) {
      return `Advantage ${this.players[0]}`;
    }

    return `Advantage ${this.players[1]}`;
  }
  public winner(): Player | undefined {
    if (this.scores[0] - this.scores[1] === 2) {
      return this.players[0];
    }
    if (this.scores[1] - this.scores[0] === 2) {
      return this.players[1];
    }

    return undefined;
  }
}
