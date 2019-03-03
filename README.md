# Tennis Score System

The scoring system for tennis works like this.

* A match has one set and a set has many games

* A game is won by the first player to have won at least 4 points in total and at least 2 points more than the opponent.

  * The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as 0, 15, 30, 40, respectively

 * If at least 3 points have been scored by each player, and the scores are equal, the score is "deuce".

 * If at least 3 points have been scored by each side and a player has one more point than his opponent, the score of the game is "advantage" for the player in the lead.

* There are many games to a set in tennis

 * A player wins a set by winning at least 6 games and at least 2 games more than the opponent.

 * If one player has won six games and the opponent five, an additional game is played. If the leading player wins that game, the player wins the set 7–5. If the trailing player wins the game, a tie-break is played.

 * A tie-break, played under a separate set of rules, allows one player to win one more game and thus the set, to give a final set score of 7–6. A tie-break is scored one point at a time. The tie-break game continues until one player wins seven points by a margin of two or more points. Instead of being scored from 0, 15, 30, 40 like regular games, the score for a tie breaker goes up incrementally from 0 by 1. i.e a player's score will go  from 0 to 1 to 2 to 3 …etc.

* Add a score method that will return the current set score followed by the current game score

* Add a pointWonBy method that indicates who won the point

Constraints

* Only worry about 1 set
* Don't worry about validation, assume the client passes in correct data

More information on tennis scoring can be found here https://en.wikipedia.org/wiki/Tennis_scoring_system

## Dependencies

* NodeJS 10.15.1
* Typescript 3.3.3333
* Jest
* Prettier

## How to start this project

### Clone the repository

```shell
git clone https://github.com/ben196888/tennis-score
cd tennis-score
```

### Install the npm packages

```shell
npm install
```

### Check the code unit test and coverage

```shell
npm run test
```

### Build the outcome

```shell
npm run build
```

## How to contribute to this project

### Start developing mode

```shell
npm run build:watch
```

### Run linting

```shell
npm run lint
```

### Run test in watch mode

```shell
npm run test:watch
```
