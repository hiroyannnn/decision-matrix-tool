import React, { useState, useEffect, useMemo } from "react";
import { QUADRANT_DESCRIPTIONS, STEPS } from "../constants/matrix";
import { useMatrix } from "../hooks/useMatrix";
import type { QuadrantType } from "../types/matrix";
import { ReflectionVisibilityToggle } from "./ReflectionVisibilityToggle";
import { Button } from "./atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./atoms/Card";
import { MatrixView } from "./matrix/MatrixView";
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
        {/* 保存されたマトリックス一覧 */}
        {savedMatrices.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">保存したマトリックス</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedMatrices.map((matrix, index) => (
                <Card key={`matrix-${matrix.date}-${index}`}>
                  <CardHeader>
                    <CardTitle>{matrix.title}</CardTitle>
                    <CardDescription>
                      {new Date(matrix.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      onClick={() => {
                        loadMatrix(index);
                        setCurrentStep(6);
                        setViewMode("view");
                      }}
                      variant="default"
                      size="sm"
                    >
                      表示
                    </Button>
                    <Button
                      onClick={() => deleteMatrix(index)}
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
        )}

        {/* ステップガイド */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>現在のステップ</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{STEPS[currentStep]}</p>

              {/* 「全体の振り返り」表示切り替えチェックボックス（最初のページ以外で表示） */}
              {currentStep > 0 && currentStep < 5 && (
                <div className="mt-4 mb-2">
                  <ReflectionVisibilityToggle
                    showReflection={showReflection}
                    setShowReflection={setShowReflection}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 全体の振り返り表示 (ステップ2-5) */}
        {showReflection && currentStep > 0 && currentStep < 5 && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {currentMatrix.title}
            </h2>
            <MatrixView matrix={currentMatrix} showReflection={false} />
          </div>
        )}

        {/* マトリックスのタイトル入力 (ステップ1) */}
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

        {/* ステップ2-5のレイアウト（入力と振り返りを横並びに） */}
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

        {/* 振り返り (ステップ6) */}
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

        {/* 表示モード */}
        {viewMode === "view" && currentStep === 6 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentMatrix.title}</CardTitle>
              {currentMatrix.description && (
                <CardDescription>
                  <div className="p-2 bg-gray-50 rounded">
                    <p>{currentMatrix.description}</p>
                  </div>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <MatrixView
                matrix={currentMatrix}
                showReflection={showReflection}
              />
            </CardContent>
            <CardFooter className="flex space-x-2">
              <Button
                onClick={() => setViewMode("edit")}
                variant="default"
                className="mr-2"
              >
                編集モードに切り替え
              </Button>
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
                  setCurrentStep(0);
                  setViewMode("edit");
                }}
                variant="default"
              >
                新しいマトリックスを作成
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>

      {/* ステップナビゲーション（固定表示） */}
      {currentStep <= 5 && (
        <div className="container mx-auto max-w-6xl flex justify-between mb-4">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            variant={currentStep === 0 ? "ghost" : "default"}
            className={currentStep === 0 ? "text-gray-300" : ""}
          >
            戻る
          </Button>
          <Button
            type="button"
            onClick={nextStep}
            disabled={currentStep === STEPS.length - 1}
            variant={currentStep === STEPS.length - 1 ? "ghost" : "default"}
            className={currentStep === STEPS.length - 1 ? "text-gray-300" : ""}
          >
            次へ
          </Button>
        </div>
      )}
    </div>
  );
};
