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
import { MatrixView } from "./MatrixView";

type MatrixViewModeProps = {
  matrix: Matrix;
  showReflection: boolean;
  onSwitchToEdit: () => void;
  onNewMatrix: () => void;
};

/**
 * 表示モードのコンポーネント
 * @param {MatrixViewModeProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 表示モードのJSX要素
 */
export const MatrixViewMode: FC<MatrixViewModeProps> = ({
  matrix,
  showReflection,
  onSwitchToEdit,
  onNewMatrix,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{matrix.title}</CardTitle>
        {matrix.description && (
          <CardDescription>
            <div className="p-2 bg-gray-50 rounded">
              <p>{matrix.description}</p>
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <MatrixView matrix={matrix} showReflection={showReflection} />
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button onClick={onSwitchToEdit} variant="default" className="mr-2">
          編集モードに切り替え
        </Button>
        <Button onClick={onNewMatrix} variant="default">
          新しいマトリックスを作成
        </Button>
      </CardFooter>
    </Card>
  );
};
