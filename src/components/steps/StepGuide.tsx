import type { FC } from "react";
import { ReflectionVisibilityToggle } from "../ReflectionVisibilityToggle";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card";

type StepGuideProps = {
  currentStep: number;
  steps: readonly string[];
  showReflection: boolean;
  onToggleReflection: (show: boolean) => void;
};

/**
 * ステップガイドを表示するコンポーネント
 * @param {StepGuideProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ステップガイドのJSX要素
 */
export const StepGuide: FC<StepGuideProps> = ({
  currentStep,
  steps,
  showReflection,
  onToggleReflection,
}) => {
  return (
    <div className="mb-6">
      <Card>
        <CardHeader>
          <CardTitle>現在のステップ</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{steps[currentStep]}</p>

          {currentStep > 0 && currentStep < 5 && (
            <div className="mt-4 mb-2">
              <ReflectionVisibilityToggle
                showReflection={showReflection}
                setShowReflection={onToggleReflection}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
