export const getInstructions = (input: string) => {
  console.log('getInstructions:input:', input);
  if (!input) {
    throw new Error('Missing instructions, see README for examples.');
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
