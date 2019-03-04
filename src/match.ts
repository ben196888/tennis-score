import {
  AbstractScoreSystem,
  DeuceSystem,
  Player,
  PointSystem,
  ScoreSystem,
  TieBreakSystem
} from './ScoreSystem';

/**
 * Game extend from score system
 */
export class Match extends AbstractScoreSystem {
  private scoreSystem: ScoreSystem;
  constructor(p1: Player, p2: Player) {
    super(p1, p2);
    this.scoreSystem = new PointSystem(p1, p2);
  }
  public pointWonBy(player: Player): void {
    this.scoreSystem.pointWonBy(player);
    if (this.scoreSystem instanceof PointSystem && this.scoreSystem.isTie()) {
      this.scoreSystem = new DeuceSystem(...this.players);

      return;
    }

    if (this.scoreSystem.winner()) {
      const idx = this.getPlayerIdx(player);
      this.scores[idx] = this.scores[idx] + 1;

      // start the tie break point system when both players won 6 games
      if (this.scores.every((s: number) => s === 6)) {
        this.scoreSystem = new TieBreakSystem(...this.players);
      } else {
        this.scoreSystem = new PointSystem(...this.players);
      }
    }
  }

  public isTie(): boolean {
    return false;
  }

  public score(): string {
    const score = `${this.scores[0]}-${this.scores[1]}`;
    const scoreFromScoreSystem = this.scoreSystem.score();
    if (scoreFromScoreSystem === "") {
      return score;
    }

    return `${score}, ${scoreFromScoreSystem}`;
  }

  public winner(): Player | undefined {
    // player win the sixth point and 2 points ahead win the game
    if (this.scores[0] === 6 && this.scores[0] - this.scores[1] >= 2) {
      return this.players[0];
    }
    if (this.scores[1] === 6 && this.scores[1] - this.scores[0] >= 2) {
      return this.players[1];
    }

    // player win the seventh point after tie break
    if (this.scores[0] === 7) {
      return this.players[0];
    }
    if (this.scores[1] === 7) {
      return this.players[1];
    }

    return undefined;
  }
}
