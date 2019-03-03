import { Match } from '../src/match';

describe("match", () => {
  let match: Match;

  beforeEach(() => {
    match = new Match("player 1", "player 2");
  });

  it("should be an Match Instance", () => {
    expect(match).toBeInstanceOf(Match);
  });
});
