import { getInputs, run } from './index.js';

describe('martian robots tests', () => {
  describe('getInputs', () => {
    test('getInputs should throw when input missing', () => {
      expect(() => getInputs('')).toThrow('Missing instructions, see README for examples.');
    });

    test('getInputs should throw when grid is out of bounds', () => {
      expect(() => getInputs('51 3\n1 1 E')).toThrow('Coordinates must be between 1 and 50');
      expect(() => getInputs('3 51\n1 1 E')).toThrow('Coordinates must be between 1 and 50');
    });

    test('getInputs should return a grid', () => {
      expect(getInputs('50 3')).toStrictEqual({
        gridSize: {
          height: 3,
          width: 50,
        },
        instructions: [],
      });
    });
  });

  describe.skip('run', () => {
    test('run should process all robots', () => {
      expect(run('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL')).toStrictEqual('1 1 E\n3 3 N LOST\n2 3 S');
    });
  });
});
