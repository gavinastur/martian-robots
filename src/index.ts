export const getInstructions = (input: string) => {
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

  return {};
};

export const run = (input: string) => {
  console.log('run:input:', input);
  const instructions = getInstructions(input);
  console.log('run:instructions:', instructions);
  //TODO deal with instructions
  return '';
};
