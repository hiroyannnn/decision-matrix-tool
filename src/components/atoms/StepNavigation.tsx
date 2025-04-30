import type { FC } from "react";
import { Button } from "./Button";

type StepNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
};

export const StepNavigation: FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
}) => {
  return (
    <div className="container mx-auto max-w-6xl flex justify-between mb-4">
      <Button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 0}
        variant={currentStep === 0 ? "ghost" : "default"}
        className={currentStep === 0 ? "text-gray-300" : ""}
      >
        戻る
      </Button>
      <Button
        type="button"
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        variant={currentStep === totalSteps - 1 ? "ghost" : "default"}
        className={currentStep === totalSteps - 1 ? "text-gray-300" : ""}
      >
        次へ
      </Button>
    </div>
  );
};
