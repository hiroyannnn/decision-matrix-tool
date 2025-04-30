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

  // マトリックスの変更を監視して自動保存
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentMatrix.title.trim() !== "") {
      const updatedMatrices = [...savedMatrices];
      const existingIndex = updatedMatrices.findIndex(
        (m) => m.title === currentMatrix.title
      );

      if (existingIndex >= 0) {
        updatedMatrices[existingIndex] = currentMatrix;
      } else {
        updatedMatrices.push(currentMatrix);
      }

      localStorage.setItem("decisionMatrices", JSON.stringify(updatedMatrices));
      setSavedMatrices(updatedMatrices);
    }
  }, [currentMatrix]);

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
  };
};
