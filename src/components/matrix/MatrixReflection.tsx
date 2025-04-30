import { memo } from "react";
import type { Matrix } from "../../types/matrix";
import { MatrixView } from "./MatrixView";

type MatrixReflectionProps = {
  matrix: Matrix;
  showReflection: boolean;
};

/**
 * 全体の振り返りを表示するコンポーネント
 * @param {MatrixReflectionProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 全体の振り返りのJSX要素
 */
export const MatrixReflection = memo(
  ({ matrix, showReflection }: MatrixReflectionProps) => {
    if (!showReflection) return null;

    return (
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">{matrix.title}</h2>
        <MatrixView matrix={matrix} showReflection={false} />
      </div>
    );
  }
);

MatrixReflection.displayName = "MatrixReflection";
