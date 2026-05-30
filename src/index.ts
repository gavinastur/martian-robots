import type { Input, Instruction, Orientation, Position, RobotInstruction } from './types.js';

export const getInputs = (input: string): Input => {
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

  //Each input should have two lines per robot
  for (let i = 0; i < robotInputs.length; i += 2) {
    const [x, y, orientation] = robotInputs[i].split(' ');
    const instructions = robotInputs[i + 1]?.split('') as Instruction[];
    const initialPosition: Position = { x: Number(x), y: Number(y), orientation: orientation as Orientation };
    const robotInstruction: RobotInstruction = { initialPosition, instructions };
    //Only add complete instructions
    if (instructions) {
      robotInstructions.push(robotInstruction);
    }
  }
  return { gridSize, robotInstructions: robotInstructions };
};

export const run = (input: string) => {
  console.log('run:input:', input);
  const processedInput = getInputs(input);
  console.log('run:processedInput:', processedInput);

  const output: string[] = [];
  //TODO deal with instructions
  processedInput.robotInstructions.forEach((r) => {
    let currPosition = r.initialPosition;
    for (let i = 0; i < r.instructions.length; i++) {
      console.log(currPosition);
      console.log(r.instructions[i]);
      const instruction = r.instructions[i];

      if (instruction === 'L' && currPosition.orientation === 'N') {
        currPosition = { ...currPosition, orientation: 'W' };
        continue;
      }
      if (instruction === 'L' && currPosition.orientation === 'E') {
        currPosition = { ...currPosition, orientation: 'N' };
        continue;
      }
      if (instruction === 'L' && currPosition.orientation === 'S') {
        currPosition = { ...currPosition, orientation: 'E' };
        continue;
      }
      if (instruction === 'L' && currPosition.orientation === 'W') {
        currPosition = { ...currPosition, orientation: 'S' };
        continue;
      }
      if (instruction === 'R' && currPosition.orientation === 'N') {
        currPosition = { ...currPosition, orientation: 'E' };
        continue;
      }
      if (instruction === 'R' && currPosition.orientation === 'E') {
        currPosition = { ...currPosition, orientation: 'S' };
        continue;
      }
      if (instruction === 'R' && currPosition.orientation === 'S') {
        currPosition = { ...currPosition, orientation: 'W' };
        continue;
      }
      if (instruction === 'R' && currPosition.orientation === 'W') {
        currPosition = { ...currPosition, orientation: 'N' };
      }
    }
    output.push(`${currPosition.x} ${currPosition.y} ${currPosition.orientation}`);
  });
  //
  return output.join('\n');
};
