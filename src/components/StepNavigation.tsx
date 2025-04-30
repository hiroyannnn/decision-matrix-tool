import type React from "react";
import { Button } from "./atoms/Button";
import { CardFooter } from "./atoms/Card";

type StepNavigationProps = {
  currentStep: number;
  stepsLength: number;
  onNext: () => void;
  onPrev: () => void;
};

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  stepsLength,
  onNext,
  onPrev,
}) => {
  return (
    <CardFooter className="flex justify-between">
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
        disabled={currentStep === stepsLength - 1}
        variant={currentStep === stepsLength - 1 ? "ghost" : "default"}
        className={currentStep === stepsLength - 1 ? "text-gray-300" : ""}
      >
        次へ
      </Button>
    </CardFooter>
  );
};

export default StepNavigation;
