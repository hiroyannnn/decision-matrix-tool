import { useEffect, useState } from "react";
import { INITIAL_MATRIX } from "../constants/matrix";
import type { Matrix } from "../types/matrix";

export const useMatrix = () => {
  const [savedMatrices, setSavedMatrices] = useState<Matrix[]>([]);
  const [currentMatrix, setCurrentMatrix] = useState<Matrix>({
    ...INITIAL_MATRIX,
    date: new Date().toISOString(),
  });
  const [nextItemId, setNextItemId] = useState(1);

  useEffect(() => {
    const savedData = localStorage.getItem("decisionMatrices");
    if (savedData) {
      setSavedMatrices(JSON.parse(savedData));
    }
  }, []);

  const saveMatrix = (matrix: Matrix) => {
    console.log("保存実行:", {
      title: matrix.title,
      reflection: matrix.reflection,
      date: matrix.date,
    });

    try {
      const savedData = localStorage.getItem("decisionMatrices");
      console.log("現在の保存データ:", savedData);

      const currentSavedMatrices = savedData ? JSON.parse(savedData) : [];
      console.log("現在のマトリックス一覧:", currentSavedMatrices);

      const updatedMatrices = [...currentSavedMatrices];
      const existingIndex = updatedMatrices.findIndex(
        (m) => m.title === matrix.title
      );

      if (existingIndex >= 0) {
        console.log("既存のマトリックスを更新:", existingIndex);
        updatedMatrices[existingIndex] = matrix;
      } else {
        console.log("新しいマトリックスを追加");
        updatedMatrices.push(matrix);
      }

      const matricesJson = JSON.stringify(updatedMatrices);
      console.log("保存するデータ:", matricesJson);

      localStorage.setItem("decisionMatrices", matricesJson);
      setSavedMatrices(updatedMatrices);
      return true;
    } catch (error) {
      console.error("保存エラー:", error);
      return false;
    }
  };

  const deleteMatrix = (index: number) => {
    const updatedMatrices = savedMatrices.filter((_, i) => i !== index);
    localStorage.setItem("decisionMatrices", JSON.stringify(updatedMatrices));
    setSavedMatrices(updatedMatrices);
  };

  const loadMatrix = (index: number) => {
    const loadedMatrix = savedMatrices[index];
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
      }, loadedMatrix.quadrants),
    };

    const maxId = Object.values(updatedMatrix.quadrants)
      .flatMap((q) => q.items)
      .reduce((max, item) => Math.max(max, item.id), nextItemId);

    setNextItemId(maxId + 1);
    setCurrentMatrix(updatedMatrix);
  };

  const addItemToQuadrant = (
    quadrant: keyof Matrix["quadrants"],
    text: string
  ) => {
    setCurrentMatrix((prev) => {
      const updatedQuadrants = { ...prev.quadrants };
      updatedQuadrants[quadrant] = {
        ...updatedQuadrants[quadrant],
        items: [...updatedQuadrants[quadrant].items, { id: nextItemId, text }],
      };
      return { ...prev, quadrants: updatedQuadrants };
    });

    setNextItemId((prevId) => prevId + 1);
  };

  const removeItem = (quadrant: keyof Matrix["quadrants"], itemId: number) => {
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

  return {
    currentMatrix,
    setCurrentMatrix,
    savedMatrices,
    deleteMatrix,
    loadMatrix,
    addItemToQuadrant,
    removeItem,
    saveMatrix,
  };
};
