import React, { useState, useEffect, useMemo } from "react";
import ReflectionVisibilityToggle from "./ReflectionVisibilityToggle";
import { Button } from "./atoms/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./atoms/Card";

const DecisionMatrixApp = () => {
  const [currentMatrix, setCurrentMatrix] = useState({
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
  const [newItem, setNewItem] = useState("");
  const [activeQuadrant, setActiveQuadrant] = useState("plusPlus");
  const [currentStep, setCurrentStep] = useState(0);
  const [savedMatrices, setSavedMatrices] = useState([]);
  const [viewMode, setViewMode] = useState("edit"); // 'edit' または 'view'
  const [showReflection, setShowReflection] = useState(true); // 「全体の振り返り」の表示/非表示状態

  // リストアイテムのIDカウンター
  const [nextItemId, setNextItemId] = useState(1);

  // ステップの説明
  const steps = [
    "1. マトリックスのタイトルを入力してください（例：「転職の選択」）",
    "2. ++: それを選択したら得られることを入力してください",
    "3. +-: それを選択したら失うことを入力してください",
    "4. -+: それを選択しなかったら得られることを入力してください",
    "5. --: それを選択しなかったら失うことを入力してください",
    "6. 全体を見て、あなたの選択を振り返ってください",
  ];

  // 象限の日本語説明
  const quadrantDescriptions = {
    plusPlus: "これを選択したら得られること",
    plusMinus: "これを選択したら失うこと",
    minusPlus: "これを選択しなかったら得られること",
    minusMinus: "これを選択しなかったら失うこと",
  };

  // 象限のマッピング
  const stepToQuadrant = useMemo(() => ({
    1: null, // タイトル入力ステップ
    2: "plusPlus",
    3: "plusMinus",
    4: "minusPlus",
    5: "minusMinus",
    6: null, // 振り返りステップ
  }), []);

  // ローカルストレージから保存されたマトリックスを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem("decisionMatrices");
    if (savedData) {
      setSavedMatrices(JSON.parse(savedData));
    }
    
    const savedShowReflection = localStorage.getItem("showReflection");
    if (savedShowReflection !== null) {
      setShowReflection(savedShowReflection === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showReflection", showReflection.toString());
  }, [showReflection]);

  // ステップが変わったときに適切な象限をアクティブにする
  useEffect(() => {
    const quadrant = stepToQuadrant[currentStep];
    if (quadrant) {
      setActiveQuadrant(quadrant);
    }
  }, [currentStep, stepToQuadrant]);

  // 新しいアイテムを現在の象限に追加する
  const addItemToQuadrant = () => {
    if (newItem.trim() === "") return;

    setCurrentMatrix((prev) => {
      const updatedQuadrants = { ...prev.quadrants };
      updatedQuadrants[activeQuadrant] = {
        ...updatedQuadrants[activeQuadrant],
        items: [
          ...updatedQuadrants[activeQuadrant].items,
          { id: nextItemId, text: newItem.trim() },
        ],
      };
      return { ...prev, quadrants: updatedQuadrants };
    });

    setNextItemId((prevId) => prevId + 1);
    setNewItem("");
  };

  // アイテムを削除する
  const removeItem = (quadrant, itemId) => {
    setCurrentMatrix((prev) => {
      const updatedQuadrants = { ...prev.quadrants };
      updatedQuadrants[quadrant] = {
        ...updatedQuadrants[quadrant],
        items: updatedQuadrants[quadrant].items.filter(
          (item) => item.id !== itemId
        ),
      };
      return { ...prev, quadrants: updatedQuadrants };
    });
  };

  // マトリックスを保存する
  const saveMatrix = () => {
    const matrixToSave = { ...currentMatrix, date: new Date().toISOString() };
    const updatedMatrices = [...savedMatrices, matrixToSave];
    localStorage.setItem("decisionMatrices", JSON.stringify(updatedMatrices));
    setSavedMatrices(updatedMatrices);

    // 新しいマトリックスを開始
    setCurrentMatrix({
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
  };

  // 保存されたマトリックスを読み込む
  const loadMatrix = (index) => {
    const loadedMatrix = savedMatrices[index];

    // 古いデータ形式対応（文字列の配列を{id, text}オブジェクトの配列に変換）
    const updatedMatrix = {
      ...loadedMatrix,
      quadrants: Object.keys(loadedMatrix.quadrants).reduce((acc, quadKey) => {
        const items = loadedMatrix.quadrants[quadKey].items.map((item, idx) => {
          return typeof item === "string"
            ? { id: nextItemId + idx, text: item }
            : item;
        });

        acc[quadKey] = {
          ...loadedMatrix.quadrants[quadKey],
          items,
        };
        return acc;
      }, {}),
    };

    // 次に使用するIDを更新
    const maxId = Object.values(updatedMatrix.quadrants)
      .flatMap((q: { items: { id: number, text: string }[] }) => q.items)
      .reduce((max, item) => Math.max(max, item.id), nextItemId);

    setNextItemId(maxId + 1);
    setCurrentMatrix(updatedMatrix);
    setCurrentStep(6);
    setViewMode("view");
  };

  // 保存されたマトリックスを削除する
  const deleteMatrix = (index) => {
    const updatedMatrices = savedMatrices.filter((_, i) => i !== index);
    localStorage.setItem("decisionMatrices", JSON.stringify(updatedMatrices));
    setSavedMatrices(updatedMatrices);
  };

  // 次のステップに進む
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 前のステップに戻る
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // エンターキーでアイテムを追加
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItemToQuadrant();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">決断マトリックスツール</h1>
        <p className="text-sm">選択に迷ったときの意思決定をサポート</p>
      </header>

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
                      onClick={() => loadMatrix(index)}
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
              <p>{steps[currentStep]}</p>

              {/* 「全体の振り返り」表示切り替えチェックボックス（最初のページ以外で表示） */}
              {currentStep > 0 && (
                <div className="mt-4 mb-2">
                  <ReflectionVisibilityToggle
                    showReflection={showReflection}
                    setShowReflection={setShowReflection}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
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
                disabled={currentStep === steps.length - 1}
                variant={currentStep === steps.length - 1 ? "ghost" : "default"}
                className={currentStep === steps.length - 1 ? "text-gray-300" : ""}
              >
                次へ
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* マトリックスのタイトル入力 (ステップ1) */}
        {currentStep === 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>マトリックスのタイトル</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={currentMatrix.title}
                onChange={(e) =>
                  setCurrentMatrix((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="例: 転職の選択、引っ越しの判断、など"
                className="w-full p-2 border rounded mb-4"
              />
              <CardTitle className="text-xl font-semibold mb-2">
                詳細情報 (オプション)
              </CardTitle>
              <textarea
                value={currentMatrix.description}
                onChange={(e) =>
                  setCurrentMatrix((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="選択肢についての詳細や背景など"
                className="w-full p-2 border rounded h-24"
              />
            </CardContent>
          </Card>
        )}

        {/* ステップ2-5のレイアウト（入力と振り返りを横並びに） */}
        {currentStep >= 1 && currentStep <= 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 象限入力 (ステップ2-5) */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {quadrantDescriptions[activeQuadrant]} (
                  {currentMatrix.quadrants[activeQuadrant].title})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="新しい項目を入力..."
                    className="flex-grow p-2 border rounded-l"
                  />
                  <Button
                    onClick={addItemToQuadrant}
                    className="rounded-l-none"
                  >
                    追加
                  </Button>
                </div>

                <ul className="bg-gray-50 p-2 rounded">
                  {currentMatrix.quadrants[activeQuadrant].items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <span>{item.text}</span>
                      <Button
                        onClick={() => removeItem(activeQuadrant, item.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 h-auto p-1"
                      >
                        ×
                      </Button>
                    </li>
                  ))}
                  {currentMatrix.quadrants[activeQuadrant].items.length === 0 && (
                    <li className="p-2 text-gray-500">まだ項目がありません</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* 全体の振り返り表示 (ステップ2-5) */}
            {showReflection && currentMatrix.title && (
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">
                  {currentMatrix.title} - 全体の振り返り
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded">
                    <h3 className="font-bold mb-2">++ 選択したら得られること</h3>
                    <ul className="list-disc pl-5">
                      {currentMatrix.quadrants.plusPlus.items.map((item) => (
                        <li key={item.id}>{item.text}</li>
                      ))}
                      {currentMatrix.quadrants.plusPlus.items.length === 0 && (
                        <li className="text-gray-500">まだ項目がありません</li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded">
                    <h3 className="font-bold mb-2">+- 選択したら失うこと</h3>
                    <ul className="list-disc pl-5">
                      {currentMatrix.quadrants.plusMinus.items.map((item) => (
                        <li key={item.id}>{item.text}</li>
                      ))}
                      {currentMatrix.quadrants.plusMinus.items.length === 0 && (
                        <li className="text-gray-500">まだ項目がありません</li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-bold mb-2">-+ 選択しなかったら得られること</h3>
                    <ul className="list-disc pl-5">
                      {currentMatrix.quadrants.minusPlus.items.map((item) => (
                        <li key={item.id}>{item.text}</li>
                      ))}
                      {currentMatrix.quadrants.minusPlus.items.length === 0 && (
                        <li className="text-gray-500">まだ項目がありません</li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded">
                    <h3 className="font-bold mb-2">-- 選択しなかったら失うこと</h3>
                    <ul className="list-disc pl-5">
                      {currentMatrix.quadrants.minusMinus.items.map((item) => (
                        <li key={item.id}>{item.text}</li>
                      ))}
                      {currentMatrix.quadrants.minusMinus.items.length === 0 && (
                        <li className="text-gray-500">まだ項目がありません</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 振り返り (ステップ6) */}
        {currentStep === 5 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentMatrix.title} - 全体の振り返り</CardTitle>
            </CardHeader>
            <CardContent>
              {/* マトリックス表示 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-bold mb-2">++ 選択したら得られること</h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.plusPlus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded">
                  <h3 className="font-bold mb-2">+- 選択したら失うこと</h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.plusMinus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-bold mb-2">
                    -+ 選択しなかったら得られること
                  </h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.minusPlus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <h3 className="font-bold mb-2">-- 選択しなかったら失うこと</h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.minusMinus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {showReflection && (
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
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={saveMatrix}
                className="w-full"
                variant="default"
              >
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
              {/* マトリックス表示 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-bold mb-2">++ 選択したら得られること</h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.plusPlus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded">
                  <h3 className="font-bold mb-2">+- 選択したら失うこと</h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.plusMinus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-bold mb-2">
                    -+ 選択しなかったら得られること
                  </h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.minusPlus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <h3 className="font-bold mb-2">-- 選択しなかったら失うこと</h3>
                  <ul className="list-disc pl-5">
                    {currentMatrix.quadrants.minusMinus.items.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {currentMatrix.reflection && showReflection && (
                <div className="mb-4">
                  <h3 className="font-bold mb-2">振り返りと決断</h3>
                  <div className="p-3 bg-gray-50 rounded">
                    <p>{currentMatrix.reflection}</p>
                  </div>
                </div>
              )}
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

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 決断マトリックスツール</p>
      </footer>
    </div>
  );
};

export default DecisionMatrixApp;
