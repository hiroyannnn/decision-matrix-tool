import { useRouter } from "next/router";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QUADRANT_DESCRIPTIONS, STEPS } from "../constants/matrix";
import { useMatrix } from "../hooks/useMatrix";
import type { Matrix, QuadrantType } from "../types/matrix";
import { Button } from "./atoms/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./atoms/Card";
import { StepNavigation } from "./atoms/StepNavigation";
import { MatrixReflection } from "./matrix/MatrixReflection";
import { MatrixView } from "./matrix/MatrixView";
import { MatrixViewMode } from "./matrix/MatrixViewMode";
import { QuadrantInput } from "./matrix/QuadrantInput";
import { SavedMatricesList } from "./matrix/SavedMatricesList";
import { StepGuide } from "./steps/StepGuide";
import { TitleStep } from "./steps/TitleStep";

interface DecisionMatrixAppProps {
  currentStep: number;
}

export const DecisionMatrixApp: React.FC<DecisionMatrixAppProps> = ({
  currentStep: initialStep,
}) => {
  const router = useRouter();
  const [showReflection, setShowReflection] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("showReflection");
      return saved ? saved === "true" : true;
    }
    return true;
  });

  const {
    currentMatrix,
    setCurrentMatrix,
    savedMatrices,
    deleteMatrix,
    loadMatrix,
    addItemToQuadrant,
    removeItem,
    saveMatrix,
  } = useMatrix();

  // 象限のマッピング
  const stepToQuadrant = useMemo(
    () => ({
      0: null, // タイトル入力ステップ
      1: "plusPlus" as QuadrantType,
      2: "plusMinus" as QuadrantType,
      3: "minusPlus" as QuadrantType,
      4: "minusMinus" as QuadrantType,
      5: null, // 振り返りステップ
    }),
    []
  );

  const handleToggleReflection = (show: boolean) => {
    setShowReflection(show);
    if (typeof window !== "undefined") {
      localStorage.setItem("showReflection", show.toString());
    }
  };

  // 次のステップに進む
  const nextStep = useCallback(() => {
    if (initialStep === 0 && currentMatrix.title.trim() === "") {
      return;
    }

    console.log("nextStep:", {
      initialStep,
      title: currentMatrix.title,
      reflection: currentMatrix.reflection,
    });

    // すべてのステップで保存を実行
    console.log(
      "保存を実行: initialStep =",
      initialStep,
      "title =",
      currentMatrix.title
    );

    // 保存を実行して完了を確認
    const checkSaveComplete = () => {
      try {
        const savedData = localStorage.getItem("decisionMatrices");
        console.log("保存確認:", savedData);

        if (savedData) {
          const matrices = JSON.parse(savedData);
          const isSaved = matrices.some(
            (m: Matrix) => m.title === currentMatrix.title
          );
          console.log("保存状態:", { isSaved, title: currentMatrix.title });

          if (isSaved) {
            console.log("保存完了、ページ遷移を実行");
            if (initialStep < STEPS.length - 1) {
              router.push(`/?step=${initialStep + 1}`, undefined, {
                shallow: true,
              });
            }
          } else {
            console.log("保存未完了、再試行");
            setTimeout(checkSaveComplete, 50);
          }
        } else {
          console.log("保存データなし、再試行");
          setTimeout(checkSaveComplete, 50);
        }
      } catch (error) {
        console.error("保存確認エラー:", error);
        setTimeout(checkSaveComplete, 50);
      }
    };

    // 保存を実行してから確認を開始
    if (saveMatrix(currentMatrix)) {
      setTimeout(checkSaveComplete, 100);
    }
  }, [initialStep, currentMatrix, router, saveMatrix]);

  // 前のステップに戻る
  const prevStep = () => {
    if (initialStep > 0) {
      router.push(`/?step=${initialStep - 1}`, undefined, { shallow: true });
    }
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <main className="flex-grow p-4">
        {initialStep === 0 && (
          <SavedMatricesList
            matrices={savedMatrices}
            onLoad={(index) => {
              loadMatrix(index);
              router.push("/?step=6", undefined, { shallow: true });
            }}
            onDelete={deleteMatrix}
          />
        )}

        {initialStep !== 6 && (
          <StepGuide
            currentStep={initialStep}
            steps={STEPS}
            showReflection={showReflection}
            onToggleReflection={handleToggleReflection}
          />
        )}

        <MatrixReflection
          matrix={currentMatrix}
          showReflection={showReflection && initialStep > 0 && initialStep < 5}
        />

        {initialStep === 0 && (
          <TitleStep
            title={currentMatrix.title}
            description={currentMatrix.description}
            onTitleChange={(title) =>
              setCurrentMatrix((prev) => ({ ...prev, title }))
            }
            onDescriptionChange={(description) =>
              setCurrentMatrix((prev) => ({ ...prev, description }))
            }
            showError={currentMatrix.title.trim() === ""}
          />
        )}

        {initialStep >= 1 && initialStep <= 4 && (
          <div className="grid grid-cols-1 gap-6">
            <QuadrantInput
              matrix={currentMatrix}
              quadrantType={stepToQuadrant[initialStep] as QuadrantType}
              quadrantDescription={
                QUADRANT_DESCRIPTIONS[
                  stepToQuadrant[initialStep] as QuadrantType
                ]
              }
              onAddItem={(text) =>
                addItemToQuadrant(
                  stepToQuadrant[initialStep] as QuadrantType,
                  text
                )
              }
              onRemoveItem={(itemId) =>
                removeItem(stepToQuadrant[initialStep] as QuadrantType, itemId)
              }
            />
          </div>
        )}

        {initialStep === 5 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentMatrix.title} - 全体の振り返り</CardTitle>
            </CardHeader>
            <CardContent>
              <MatrixView matrix={currentMatrix} showReflection={false} />

              <div className="mb-4">
                <h3 className="font-bold mb-2">振り返りと決断</h3>
                <div className="mb-4 text-gray-700">
                  選択肢のメリット・デメリットを全体的に眺めて、あなたの決断を記録しましょう。
                  特に「選択した場合に失うこと」に対する対処法も考えてみてください。
                </div>
                <textarea
                  value={currentMatrix.reflection}
                  onChange={(e) => {
                    const newReflection = e.target.value;
                    setCurrentMatrix((prev) => ({
                      ...prev,
                      reflection: newReflection,
                    }));
                    // 振り返りを入力したら即座に保存
                    saveMatrix({
                      ...currentMatrix,
                      reflection: newReflection,
                    });
                  }}
                  placeholder="全体を見た感想や、最終的な決断、「選択したら失うこと」への対処法などを記入してください..."
                  className="w-full p-2 border rounded h-32"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setCurrentMatrix({
                    ...currentMatrix,
                    title: "",
                    description: "",
                    quadrants: {
                      plusPlus: { title: "++", items: [] },
                      plusMinus: { title: "+-", items: [] },
                      minusPlus: { title: "-+", items: [] },
                      minusMinus: { title: "--", items: [] },
                    },
                    reflection: "",
                  });
                  router.push("/?step=0", undefined, { shallow: true });
                }}
                className="w-full"
                variant="default"
              >
                トップに戻る
              </Button>
            </CardFooter>
          </Card>
        )}

        {initialStep === 6 && (
          <MatrixViewMode
            matrix={currentMatrix}
            showReflection={showReflection}
            onNewMatrix={() => {
              setCurrentMatrix({
                ...currentMatrix,
                title: "",
                description: "",
                quadrants: {
                  plusPlus: { title: "++", items: [] },
                  plusMinus: { title: "+-", items: [] },
                  minusPlus: { title: "-+", items: [] },
                  minusMinus: { title: "--", items: [] },
                },
                reflection: "",
              });
              router.push("/?step=0", undefined, { shallow: true });
            }}
          />
        )}
      </main>

      {initialStep <= 5 && (
        <StepNavigation
          currentStep={initialStep}
          totalSteps={STEPS.length}
          onPrev={prevStep}
          onNext={nextStep}
        />
      )}
    </div>
  );
};
