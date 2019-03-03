import { Match, Player } from '../src/match';

describe("match", () => {
  const playerOne: Player = "player 1";
  const playerTwo: Player = "player 2";
  let match: Match;

  beforeEach(() => {
    match = new Match(playerOne, playerTwo);
  });

  it("should be an Match Instance", () => {
    expect(match).toBeInstanceOf(Match);
  });

  it("should throw an error when duplicated name", () => {
    const dupName = "Joe Doe";
    expect(() => {
      match = new Match(dupName, dupName);
    }).toThrowError("duplicate player name");
  });

  it("should return default score", () => {
    expect(match.score()).toEqual("0-0, 0-0");
  });

  it("should throw an error when player not found", () => {
    const playerNotExist: Player = "some random name";
    expect(() => {
      match.pointWonBy(playerNotExist);
    }).toThrowError("player not found");
  });

  it("should return correct score", () => {
    match.pointWonBy(playerOne);
    expect(match.score()).toEqual("0-0, 15-0");
    match.pointWonBy(playerOne);
    expect(match.score()).toEqual("0-0, 30-0");
    match.pointWonBy(playerTwo);
    expect(match.score()).toEqual("0-0, 30-15");
    match.pointWonBy(playerOne);
    expect(match.score()).toEqual("0-0, 40-15");
  });
});
