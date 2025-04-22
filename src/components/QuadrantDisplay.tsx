import React from "react";

type QuadrantDisplayProps = {
  title: string;
  items: { id: number; text: string }[];
  bgColorClass: string;
  quadrantTitle: string;
};

const QuadrantDisplay: React.FC<QuadrantDisplayProps> = ({
  title,
  items,
  bgColorClass,
  quadrantTitle,
}) => {
  return (
    <div className={`${bgColorClass} p-4 rounded`}>
      <h3 className="font-bold mb-2">
        {quadrantTitle} {title}
      </h3>
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
};

export default QuadrantDisplay;
