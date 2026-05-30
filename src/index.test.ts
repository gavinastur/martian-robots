import { getGrid, getInputs, run } from './index.js';

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
        robotInstructions: [],
      });
    });

    test('getInputs should process input', () => {
      expect(getInputs('5 3\n1 1 E\nRFRFRFRF')).toStrictEqual({
        gridSize: {
          height: 3,
          width: 5,
        },
        robotInstructions: [
          {
            initialPosition: {
              orientation: 'E',
              x: 1,
              y: 1,
            },
            instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
          },
        ],
      });
    });

    test('getInputs should filter out incomplete inputs', () => {
      expect(getInputs('50 3\n1 1 E')).toStrictEqual({
        gridSize: {
          height: 3,
          width: 50,
        },
        robotInstructions: [],
      });
    });
  });

  describe('getGrid', () => {
    test('getGrid should set up a basic grid', () => {
      expect(getGrid({ height: 0, width: 0 })).toStrictEqual({
        height: 0,
        isLost: expect.any(Function),
        width: 0,
      });
    });

    test('isLost should be true when off grid', () => {
      const g = getGrid({ height: 0, width: 0 });
      expect(g.isLost({ x: 1, y: 1, orientation: 'E' })).toStrictEqual(true);
    });

    test('isLost should be false when on grid', () => {
      const g = getGrid({ height: 3, width: 5 });
      expect(g.isLost({ x: 1, y: 1, orientation: 'E' })).toStrictEqual(false);
    });
  });

  describe('run', () => {
    test('run should process single robot', () => {
      expect(run('5 3\n1 1 E\nRFRFRFRF')).toStrictEqual('1 1 E');
    });

    test('run should process all robots', () => {
      expect(run('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL')).toStrictEqual('1 1 E\n3 3 N LOST\n2 3 S');
    });
  });
});
