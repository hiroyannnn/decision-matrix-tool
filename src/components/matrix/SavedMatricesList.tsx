import type { FC } from "react";
import type { Matrix } from "../../types/matrix";
import { Button } from "../atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../atoms/Card";

type SavedMatricesListProps = {
  matrices: Matrix[];
  onLoad: (index: number) => void;
  onDelete: (index: number) => void;
};

/**
 * 保存されたマトリックス一覧を表示するコンポーネント
 * @param {SavedMatricesListProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 保存されたマトリックス一覧のJSX要素
 */
export const SavedMatricesList: FC<SavedMatricesListProps> = ({
  matrices,
  onLoad,
  onDelete,
}) => {
  if (matrices.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">保存したマトリックス</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matrices.map((matrix, index) => (
          <Card key={`matrix-${matrix.date}-${index}`}>
            <CardHeader>
              <CardTitle>{matrix.title}</CardTitle>
              <CardDescription>
                {new Date(matrix.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end space-x-2">
              <Button onClick={() => onLoad(index)} variant="default" size="sm">
                表示
              </Button>
              <Button
                onClick={() => onDelete(index)}
                variant="destructive"
                size="sm"
              >
                削除
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
