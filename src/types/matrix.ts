export type Matrix = {
  title: string;
  description: string;
  date: string;
  quadrants: {
    plusPlus: { title: string; items: { id: number; text: string }[] };
    plusMinus: { title: string; items: { id: number; text: string }[] };
    minusPlus: { title: string; items: { id: number; text: string }[] };
    minusMinus: { title: string; items: { id: number; text: string }[] };
  };
  reflection: string;
};

export type QuadrantType = 'plusPlus' | 'plusMinus' | 'minusPlus' | 'minusMinus';
