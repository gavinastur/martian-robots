export type GridSize = {
  width: number;
  height: number;
};

export type Input = {
  gridSize: GridSize;
  robotInstructions: RobotInstruction[];
};

export type Instruction = 'L' | 'R' | 'F';
export type Orientation = 'N' | 'E' | 'S' | 'W';
export type Position = { x: number; y: number; orientation: Orientation; isLost?: boolean };

export type RobotInstruction = {
  initialPosition: Position;
  instructions: Instruction[];
};

export type Grid = {
  width: number;
  height: number;
  isLost: (position: Position) => boolean;
};
