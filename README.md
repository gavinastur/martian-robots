# Martian Robots

A program that determines each sequence of robot positions and reports the final position of the robot.


## Problem 

The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth.
A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L” “R”,, and “F”.

- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

Since the grid is rectangular and bounded, a robot that moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.


## Input format

The input is a string with the following structure:

- *Line 1* - Grid dimensions (max value is `50`)
- *Subsequent pairs of lines* - Each robot's starting position and instruction sequence

## Example

**Sample input:**
```
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
```

**Sample output:**
```
1 1 E
3 3 N LOST
2 3 S
```


## Run the code

### Pre-reqs

- Node (LTS)
- Npm

If you use NVM then use the version in `.nvmrc` by running the following.
```bash
nvm use
```

### Installation

```bash
npm install
```

### Usage

Pass the input as a single CLI argument, using `$'...'` for newlines handling. 

```bash
npx tsx src/index.ts $'5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL'
```

### Tests

Run tests with coverage

```bash
npm test
```



## Tech choices

* TypeScript - type safety and modern JavaScript features. Catch issue at compile time and improve code readability and maintainability.
* Biome - blazingly fast linter and code formatting to maintain code quality and consistency. So fast you might not think it's actually doing anything!
* Vitest - fast test runner that drops in nicely with most modern frameworks, plugin feature rich too.

## Approach

TDD - I started with the tests first to define expected behavior and edge cases, then implement the code to pass those tests.

I followed the logical steps of the problem:
1. parsing the input, dealing with some basic requirements of validation, and then building a usable internal object,
2. simulating the robot movements according to the instructions
3. handling the edge cases of robots falling off the grid
4. handling leaving a scent, and then ensuring that subsequent robots respect that scent.

## If I had more time

* The validation is awfully basic for a somewhat complex input, I would use a library like `zod` to define a schema and validate against. It adds another dependency, but it would save time and effort so you can focus elsewhere,
* Improve general error handling throughout, currently I only deal with input issues.
* Possibly split out the obvious steps into their own files, could be overkill but it would make the code more modular and easier to maintain / test / share.
* Refactoring the processing of the instructions, it's very verbose with duplicated chunks e.g. (add moveForward / leftRight functions) so defo needs some love. But as one of my colleagues at IKEA say. "Make it work, make it right, make it fast".
* I removed all the logging since it looked a mess when running via CLI. I would add it back in a more structured way, maybe using a logging library that allows for different log levels and better formatting.
