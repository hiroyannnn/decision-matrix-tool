import type React from "react";
import { useState } from "react";
import { Button } from "./atoms/Button";

type QuadrantInputProps = {
  title: string;
  items: { id: number; text: string }[];
  onAddItem: (text: string) => void;
  onRemoveItem: (id: number) => void;
  quadrantTitle: string;
};

const QuadrantInput: React.FC<QuadrantInputProps> = ({
  title,
  items,
  onAddItem,
  onRemoveItem,
  quadrantTitle,
}) => {
  const [newItem, setNewItem] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    onAddItem(newItem.trim());
    setNewItem("");
  };

  return (
    <div>
      <h3 className="font-bold mb-2">
        {title} ({quadrantTitle})
      </h3>
      <div className="flex mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="新しい項目を入力..."
          className="flex-grow p-2 border rounded-l"
        />
        <Button onClick={handleAddItem} className="rounded-l-none">
          追加
        </Button>
      </div>

      <ul className="bg-gray-50 p-2 rounded">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{item.text}</span>
            <Button
              onClick={() => onRemoveItem(item.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 h-auto p-1"
            >
              ×
            </Button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="p-2 text-gray-500">まだ項目がありません</li>
        )}
      </ul>
    </div>
  );
};

export default QuadrantInput;
