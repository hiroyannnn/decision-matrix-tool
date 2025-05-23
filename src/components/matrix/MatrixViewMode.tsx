import { memo } from "react";
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
import { MatrixView } from "./MatrixView";

type MatrixViewModeProps = {
  matrix: Matrix;
  showReflection: boolean;
  onNewMatrix: () => void;
};

/**
 * 表示モードのコンポーネント
 * @param {MatrixViewModeProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 表示モードのJSX要素
 */
export const MatrixViewMode = memo(
  ({ matrix, showReflection, onNewMatrix }: MatrixViewModeProps) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{matrix.title}</CardTitle>
        {matrix.description && (
          <CardDescription>
            <div className="p-2 bg-gray-50 rounded">
              <span>{matrix.description}</span>
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <MatrixView matrix={matrix} showReflection={showReflection} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNewMatrix} variant="default">
          新しいマトリックスを作成
        </Button>
      </CardFooter>
    </Card>
  )
);

MatrixViewMode.displayName = "MatrixViewMode";
