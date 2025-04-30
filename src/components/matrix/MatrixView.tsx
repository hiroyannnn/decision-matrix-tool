import React from "react";
import type { Matrix } from "../../types/matrix";

type QuadrantViewProps = {
  title: string;
  items: { id: number; text: string }[];
  bgColor: string;
};

const QuadrantView = ({ title, items, bgColor }: QuadrantViewProps) => (
  <div className={`${bgColor} p-4 rounded`}>
    <h3 className="font-bold mb-2">{title}</h3>
    <ul className="list-disc pl-5">
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
      {items.length === 0 && (
        <li className="text-gray-500">まだ項目がありません</li>
      )}
    </ul>
  </div>
);

type MatrixViewProps = {
  matrix: Matrix;
  showReflection?: boolean;
};

export const MatrixView = ({
  matrix,
  showReflection = true,
}: MatrixViewProps) => (
  <div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <QuadrantView
        title="-- 選択しなかったら失うこと"
        items={matrix.quadrants.minusMinus.items}
        bgColor="bg-red-50"
      />
      <QuadrantView
        title="++ 選択したら得られること"
        items={matrix.quadrants.plusPlus.items}
        bgColor="bg-green-50"
      />
      <QuadrantView
        title="-+ 選択しなかったら得られること"
        items={matrix.quadrants.minusPlus.items}
        bgColor="bg-blue-50"
      />
      <QuadrantView
        title="+- 選択したら失うこと"
        items={matrix.quadrants.plusMinus.items}
        bgColor="bg-yellow-50"
      />
    </div>

    {showReflection && matrix.reflection && (
      <div className="mb-4">
        <h3 className="font-bold mb-2">振り返りと決断</h3>
        <div className="p-3 bg-gray-50 rounded">
          <span>{matrix.reflection}</span>
        </div>
      </div>
    )}
  </div>
);
