import { AbstractScoreSystem, Player } from '.';

/**
 * Tie break extend from score system
 */
export class TieBreakSystem extends AbstractScoreSystem {
  public pointWonBy(player: Player): void {
    const idx = this.getPlayerIdx(player);
    this.scores[idx] = this.scores[idx] + 1;
  }

  public isTie(): boolean {
    return false;
  }

  public score(): string {
    if (this.scores.every((s: number) => s === 0)) {
      return "";
    }

    return `${this.scores[0]}-${this.scores[1]}`;
  }

  public winner(): Player | undefined {
    // player win minimum 7 points and 2 points ahead to win the tie break
    if (this.scores[0] >= 7 && this.scores[0] - this.scores[1] >= 2) {
      return this.players[0];
    }
    if (this.scores[1] >= 7 && this.scores[1] - this.scores[0] >= 2) {
      return this.players[1];
    }

    return undefined;
  }
}
