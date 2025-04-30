import type React from "react";
import QuadrantDisplay from "./QuadrantDisplay";

type Quadrant = {
  title: string;
  items: { id: number; text: string }[];
};

type MatrixOverviewProps = {
  quadrants: {
    plusPlus: Quadrant;
    plusMinus: Quadrant;
    minusPlus: Quadrant;
    minusMinus: Quadrant;
  };
  quadrantDescriptions: {
    [key: string]: string;
  };
};

const MatrixOverview: React.FC<MatrixOverviewProps> = ({
  quadrants,
  quadrantDescriptions,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <QuadrantDisplay
        title={quadrantDescriptions.plusPlus}
        items={quadrants.plusPlus.items}
        bgColorClass="bg-green-50"
        quadrantTitle={quadrants.plusPlus.title}
      />
      <QuadrantDisplay
        title={quadrantDescriptions.plusMinus}
        items={quadrants.plusMinus.items}
        bgColorClass="bg-yellow-50"
        quadrantTitle={quadrants.plusMinus.title}
      />
      <QuadrantDisplay
        title={quadrantDescriptions.minusPlus}
        items={quadrants.minusPlus.items}
        bgColorClass="bg-blue-50"
        quadrantTitle={quadrants.minusPlus.title}
      />
      <QuadrantDisplay
        title={quadrantDescriptions.minusMinus}
        items={quadrants.minusMinus.items}
        bgColorClass="bg-red-50"
        quadrantTitle={quadrants.minusMinus.title}
      />
    </div>
  );
};

export default MatrixOverview;
