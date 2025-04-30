import type { FC } from "react";
import type { Matrix, QuadrantType } from "../../types/matrix";
import { Button } from "../atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card";

type QuadrantInputProps = {
  matrix: Matrix;
  quadrantType: QuadrantType;
  quadrantDescription: string;
  onAddItem: (text: string) => void;
  onRemoveItem: (itemId: number) => void;
};

/**
 * 象限の入力フォームを表示するコンポーネント
 * @param {QuadrantInputProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 象限入力のJSX要素
 */
export const QuadrantInput: FC<QuadrantInputProps> = ({
  matrix,
  quadrantType,
  quadrantDescription,
  onAddItem,
  onRemoveItem,
}) => {
  const quadrant = matrix.quadrants[quadrantType];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {quadrantDescription} ({quadrant.title})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                onAddItem(e.currentTarget.value.trim());
                e.currentTarget.value = "";
              }
            }}
            placeholder="項目を入力してEnterキーを押してください"
            className="w-full p-2 border rounded mb-4"
          />
          <ul className="space-y-2">
            {quadrant.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <span>{item.text}</span>
                <Button
                  onClick={() => onRemoveItem(item.id)}
                  variant="ghost"
                  size="sm"
                >
                  削除
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
