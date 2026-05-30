import { getInstructions, run } from './index.js';

describe('martian robots tests', () => {
  describe('getInstructions', () => {
    test('getInstructions should throw when input missing', () => {
      expect(() => getInstructions('')).toThrow('Missing instructions, see README for examples.');
    });
  });

  describe.skip('run', () => {
    test('run should process all robots', () => {
      expect(run('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL')).toStrictEqual('1 1 E\n3 3 N LOST\n2 3 S');
    });
  });
});
