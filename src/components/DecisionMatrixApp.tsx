import React, { useState, useEffect, useMemo } from "react";
import { QUADRANT_DESCRIPTIONS, STEPS } from "../constants/matrix";
import { useMatrix } from "../hooks/useMatrix";
import type { QuadrantType } from "../types/matrix";
import { Button } from "./atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./atoms/Card";
import { StepNavigation } from "./atoms/StepNavigation";
import { MatrixReflection } from "./matrix/MatrixReflection";
import { MatrixView } from "./matrix/MatrixView";
import { MatrixViewMode } from "./matrix/MatrixViewMode";
import { SavedMatricesList } from "./matrix/SavedMatricesList";
import { StepGuide } from "./steps/StepGuide";
import { TitleStep } from "./steps/TitleStep";

export const DecisionMatrixApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [showReflection, setShowReflection] = useState(true);

  const {
    currentMatrix,
    setCurrentMatrix,
    savedMatrices,
    saveMatrix,
    deleteMatrix,
    loadMatrix,
    addItemToQuadrant,
    removeItem,
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

  useEffect(() => {
    localStorage.setItem("showReflection", showReflection.toString());
  }, [showReflection]);

  // 次のステップに進む
  const nextStep = () => {
    if (currentStep === 0 && currentMatrix.title.trim() === "") {
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 前のステップに戻る
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <main className="flex-grow p-4">
        <SavedMatricesList
          matrices={savedMatrices}
          onLoad={(index) => {
            loadMatrix(index);
            setCurrentStep(6);
            setViewMode("view");
          }}
          onDelete={deleteMatrix}
        />

        <StepGuide
          currentStep={currentStep}
          steps={STEPS}
          showReflection={showReflection}
          onToggleReflection={setShowReflection}
        />

        <MatrixReflection
          matrix={currentMatrix}
          showReflection={showReflection && currentStep > 0 && currentStep < 5}
        />

        {currentStep === 0 && (
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

        {currentStep >= 1 && currentStep <= 4 && (
          <div className="grid grid-cols-1 gap-6">
            {/* 象限入力 (ステップ2-5) */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {stepToQuadrant[currentStep] ? (
                    <>
                      {
                        QUADRANT_DESCRIPTIONS[
                          stepToQuadrant[currentStep] as QuadrantType
                        ]
                      }{" "}
                      (
                      {
                        currentMatrix.quadrants[
                          stepToQuadrant[currentStep] as QuadrantType
                        ].title
                      }
                      )
                    </>
                  ) : (
                    "入力フォーム"
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stepToQuadrant[currentStep] && (
                  <div>
                    <input
                      type="text"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          addItemToQuadrant(
                            stepToQuadrant[currentStep] as QuadrantType,
                            e.currentTarget.value.trim()
                          );
                          e.currentTarget.value = "";
                        }
                      }}
                      placeholder="項目を入力してEnterキーを押してください"
                      className="w-full p-2 border rounded mb-4"
                    />
                    <ul className="space-y-2">
                      {currentMatrix.quadrants[
                        stepToQuadrant[currentStep] as QuadrantType
                      ].items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                          <span>{item.text}</span>
                          <Button
                            onClick={() =>
                              removeItem(
                                stepToQuadrant[currentStep] as QuadrantType,
                                item.id
                              )
                            }
                            variant="ghost"
                            size="sm"
                          >
                            削除
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 5 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentMatrix.title} - 全体の振り返り</CardTitle>
            </CardHeader>
            <CardContent>
              <MatrixView matrix={currentMatrix} showReflection={false} />

              <div className="mb-4">
                <h3 className="font-bold mb-2">振り返りと決断</h3>
                <p className="mb-4 text-gray-700">
                  選択肢のメリット・デメリットを全体的に眺めて、あなたの決断を記録しましょう。
                  特に「選択した場合に失うこと」に対する対処法も考えてみてください。
                </p>
                <textarea
                  value={currentMatrix.reflection}
                  onChange={(e) =>
                    setCurrentMatrix((prev) => ({
                      ...prev,
                      reflection: e.target.value,
                    }))
                  }
                  placeholder="全体を見た感想や、最終的な決断、「選択したら失うこと」への対処法などを記入してください..."
                  className="w-full p-2 border rounded h-32"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveMatrix} className="w-full" variant="default">
                このマトリックスを保存する
              </Button>
            </CardFooter>
          </Card>
        )}

        {viewMode === "view" && currentStep === 6 && (
          <MatrixViewMode
            matrix={currentMatrix}
            showReflection={showReflection}
            onSwitchToEdit={() => setViewMode("edit")}
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
              setCurrentStep(0);
              setViewMode("edit");
            }}
          />
        )}
      </main>

      {/* ステップナビゲーション（固定表示） */}
      {currentStep <= 5 && (
        <StepNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onPrev={prevStep}
          onNext={nextStep}
        />
      )}
    </div>
  );
};
