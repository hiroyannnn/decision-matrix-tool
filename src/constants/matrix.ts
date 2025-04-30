export const STEPS = [
  "1. マトリックスのタイトルを入力してください（例：「転職の選択」）",
  "2. ++: それを選択したら得られることを入力してください",
  "3. +-: それを選択したら失うことを入力してください",
  "4. -+: それを選択しなかったら得られることを入力してください",
  "5. --: それを選択しなかったら失うことを入力してください",
  "6. 全体を見て、あなたの選択を振り返ってください",
] as const;

export const QUADRANT_DESCRIPTIONS = {
  plusPlus: "これを選択したら得られること",
  plusMinus: "これを選択したら失うこと",
  minusPlus: "これを選択しなかったら得られること",
  minusMinus: "これを選択しなかったら失うこと",
} as const;

export const INITIAL_MATRIX = {
  title: "",
  description: "",
  quadrants: {
    plusPlus: { title: "++", items: [] },
    plusMinus: { title: "+-", items: [] },
    minusPlus: { title: "-+", items: [] },
    minusMinus: { title: "--", items: [] },
  },
  reflection: "",
};
