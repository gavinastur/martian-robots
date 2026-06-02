import type { Grid, GridSize, Input, Instruction, Orientation, Position, RobotInstruction } from './types.js';

const turnLeft: Record<Orientation, Orientation> = { N: 'W', W: 'S', S: 'E', E: 'N' };
const turnRight: Record<Orientation, Orientation> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const turns: Partial<Record<Instruction, Record<Orientation, Orientation>>> = { L: turnLeft, R: turnRight };
const moves: Partial<Record<Instruction, (pos: Position) => Partial<Position>>> = {
  F: (pos) =>
    ({
      N: { y: pos.y + 1 },
      S: { y: pos.y - 1 },
      E: { x: pos.x + 1 },
      W: { x: pos.x - 1 },
    })[pos.orientation],
};

export const getInputs = (input: string): Input => {
  if (!input) {
    throw new Error('Missing instructions, see README for examples.');
  }

  const lines = input.split('\n');
  //First line of instructions is our grid
  const [width, height] = lines[0].split(' ').map(Number);

  if (width < 1 || width > 50 || height < 1 || height > 50) {
    throw new Error('Coordinates must be between 1 and 50');
  }

  const gridSize: GridSize = { width, height };
  const robotInstructions: RobotInstruction[] = [];

  //Each input should have two lines per robot
  for (let i = 1; i < lines.length; i += 2) {
    const instructions = lines[i + 1]?.split('') as Instruction[];
    if (instructions) {
      const [x, y, orientation] = lines[i].split(' ');
      robotInstructions.push({
        initialPosition: { x: Number(x), y: Number(y), orientation: orientation as Orientation },
        instructions,
      });
    }
  }
  return { gridSize, robotInstructions };
};

export const getGrid = (grid: GridSize): Grid => {
  const { width, height } = grid;
  const scents = new Set<string>();
  const getScentKey = ({ x, y, orientation }: Position) => `${x}-${y}-${orientation}`;
  return {
    width,
    height,
    isLost: ({ x, y }: Position) => x < 0 || y < 0 || x > width || y > height,
    addScent: (p) => scents.add(getScentKey(p)),
    hasScent: (p) => scents.has(getScentKey(p)),
  };
};

export const run = (input: string) => {
  const processedInput = getInputs(input);
  const output: string[] = [];

  const grid = getGrid(processedInput.gridSize);
  processedInput.robotInstructions.forEach((r) => {
    let currPosition = r.initialPosition;
    for (let i = 0; i < r.instructions.length; i++) {
      const instruction = r.instructions[i];

      const turn = turns[instruction];
      if (turn) {
        currPosition = { ...currPosition, orientation: turn[currPosition.orientation] };
        continue;
      }
      const move = moves[instruction];
      if (move) {
        if (!grid.hasScent(currPosition)) {
          const nextPosition = { ...currPosition, ...move(currPosition) };
          const isLost = grid.isLost(nextPosition);
          if (isLost) {
            grid.addScent(currPosition);
            currPosition = { ...currPosition, isLost };
            break;
          }
          currPosition = nextPosition;
        }
      }
    }
    output.push(`${currPosition.x} ${currPosition.y} ${currPosition.orientation}${currPosition.isLost ? ' LOST' : ''}`);
  });
  return output.join('\n');
};
