type GridSize = {
  width: number;
  height: number;
};

type Inputs = {
  gridSize: GridSize;
  instructions: any[];
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

  return { gridSize, instructions: [] };
};

export const run = (input: string) => {
  console.log('run:input:', input);
  const inputs = getInputs(input);
  console.log('run:inputs:', inputs);
  //TODO deal with instructions
  return '';
};
