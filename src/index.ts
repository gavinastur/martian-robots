type GridSize = {
  width: number;
  height: number;
};

type Inputs = {
  gridSize: GridSize;
  robotInstructions: RobotInstruction[];
};

type Orientation = 'N' | 'E' | 'S' | 'W';
type Instruction = 'L' | 'R' | 'F';
type Position = { x: number; y: number; orientation: Orientation; isLost?: boolean };

type RobotInstruction = {
  initialPosition: Position;
  instructions: Instruction[];
};

export const getInputs = (input: string): Inputs => {
  console.log('getInstructions:input:', input);
  if (!input) {
    throw new Error('Missing instructions, see README for examples.');
  }

  const lines: string[] = input.split('\n');

  //First line of instructions is our grid
  const [width, height] = lines[0].split(' ');

  if (Number(width) > 50 || Number(height) > 50) {
    throw new Error('Coordinates must be between 1 and 50');
  }
  const gridSize = { width: Number(width), height: Number(height) };

  //Now deal with instructions
  const [, ...robotInputs] = lines;
  const robotInstructions: RobotInstruction[] = [];

  for (let i = 0; i < robotInputs.length; i += 2) {
    const [x, y, orientation] = robotInputs[i].split(' ');
    const instructions = robotInputs[i + 1]?.split('') as Instruction[];
    const initialPosition: Position = { x: Number(x), y: Number(y), orientation: orientation as Orientation };
    const robotInstruction: RobotInstruction = { initialPosition, instructions };
    robotInstructions.push(robotInstruction);
  }

  return { gridSize, robotInstructions: robotInstructions };
};

export const run = (input: string) => {
  console.log('run:input:', input);
  const inputs = getInputs(input);
  console.log('run:inputs:', inputs);
  //TODO deal with instructions
  return '';
};
