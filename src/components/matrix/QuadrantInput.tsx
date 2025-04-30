import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import type { Matrix, QuadrantType } from "../../types/matrix";
import { Button } from "../atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card";

type QuadrantHeaderProps = {
  description: string;
  title: string;
};

const QuadrantHeader: FC<QuadrantHeaderProps> = memo(
  ({ description, title }) => (
    <CardHeader>
      <CardTitle>
        {description} ({title})
      </CardTitle>
    </CardHeader>
  )
);

QuadrantHeader.displayName = "QuadrantHeader";

type ItemInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const ItemInput: FC<ItemInputProps> = memo(
  ({ value, onChange, onAdd, onKeyPress }) => (
    <div className="flex mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="項目を入力してEnterキーを押すか、追加ボタンをクリックしてください"
        className="flex-grow p-2 border rounded-l"
        aria-label="項目の入力"
      />
      <Button
        onClick={onAdd}
        className="rounded-l-none"
        disabled={!value.trim()}
        aria-label="項目を追加"
      >
        追加
      </Button>
    </div>
  )
);

ItemInput.displayName = "ItemInput";

type ItemListProps = {
  items: { id: number; text: string }[];
  onRemove: (id: number) => void;
};

const ItemList: FC<ItemListProps> = memo(({ items, onRemove }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li
        key={item.id}
        className="flex justify-between items-center p-2 bg-gray-50 rounded"
      >
        <span>{item.text}</span>
        <Button
          onClick={() => onRemove(item.id)}
          variant="ghost"
          size="sm"
          aria-label={`${item.text}を削除`}
        >
          削除
        </Button>
      </li>
    ))}
    {items.length === 0 && (
      <li className="p-2 text-gray-500">まだ項目がありません</li>
    )}
  </ul>
));

ItemList.displayName = "ItemList";

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
export const QuadrantInput: FC<QuadrantInputProps> = memo(
  ({ matrix, quadrantType, quadrantDescription, onAddItem, onRemoveItem }) => {
    const [inputValue, setInputValue] = useState("");
    const quadrant = matrix.quadrants[quadrantType];

    const handleAddItem = useCallback(() => {
      if (inputValue.trim()) {
        onAddItem(inputValue.trim());
        setInputValue("");
      }
    }, [inputValue, onAddItem]);

    const handleKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
          onAddItem(inputValue.trim());
          setInputValue("");
        }
      },
      [inputValue, onAddItem]
    );

    return (
      <Card>
        <QuadrantHeader
          description={quadrantDescription}
          title={quadrant.title}
        />
        <CardContent>
          <div>
            <ItemInput
              value={inputValue}
              onChange={setInputValue}
              onAdd={handleAddItem}
              onKeyPress={handleKeyPress}
            />
            <ItemList items={quadrant.items} onRemove={onRemoveItem} />
          </div>
        </CardContent>
      </Card>
    );
  }
);

QuadrantInput.displayName = "QuadrantInput";
