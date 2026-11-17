import { act, cleanup, renderHook } from "@testing-library/react";
import { Window } from "happy-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { INITIAL_MATRIX } from "../constants/matrix";
import { useMatrix } from "./useMatrix";

const matrix = {
  ...INITIAL_MATRIX,
  title: "保存した決断",
  date: "2026-11-11T00:00:00.000Z",
};

describe("useMatrix storage", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "localStorage",
      new Window({ url: "http://localhost" }).localStorage
    );
    localStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it.each(["{broken", "null", "{}", '"text"', "42", "false", ""])(
    "starts safely without overwriting invalid saved data: %j",
    (savedData) => {
      localStorage.setItem("decisionMatrices", savedData);
      const { result } = renderHook(() => useMatrix());

      expect(result.current.savedMatrices).toEqual([]);
      expect(result.current.currentMatrix.title).toBe("");
      expect(localStorage.getItem("decisionMatrices")).toBe(savedData);
      act(() => {
        expect(result.current.saveMatrix(matrix)).toBe(false);
      });
      expect(localStorage.getItem("decisionMatrices")).toBe(savedData);
      expect(result.current.savedMatrices).toEqual([]);
    }
  );

  it("starts when storage reads are unavailable", () => {
    vi.spyOn(localStorage, "getItem").mockImplementation(() => {
      throw new DOMException("Storage unavailable", "SecurityError");
    });
    const { result } = renderHook(() => useMatrix());
    expect(result.current.savedMatrices).toEqual([]);
    act(() => {
      expect(result.current.saveMatrix(matrix)).toBe(false);
    });
  });

  it("loads existing matrices and updates them normally", () => {
    localStorage.setItem("decisionMatrices", JSON.stringify([matrix]));
    const { result } = renderHook(() => useMatrix());
    expect(result.current.savedMatrices).toEqual([matrix]);
    act(() => result.current.loadMatrix(0));
    expect(result.current.currentMatrix).toEqual(matrix);

    const updated = { ...matrix, description: "更新" };
    act(() => {
      expect(result.current.saveMatrix(updated)).toBe(true);
    });
    expect(result.current.savedMatrices).toEqual([updated]);
    expect(JSON.parse(localStorage.getItem("decisionMatrices"))).toEqual([
      updated,
    ]);
  });

  it.each([null, "[]"])(
    "saves a new matrix with empty storage: %j",
    (savedData) => {
      if (savedData !== null)
        localStorage.setItem("decisionMatrices", savedData);
      const { result } = renderHook(() => useMatrix());
      act(() => {
        expect(result.current.saveMatrix(matrix)).toBe(true);
      });
      expect(result.current.savedMatrices).toEqual([matrix]);
      expect(JSON.parse(localStorage.getItem("decisionMatrices"))).toEqual([
        matrix,
      ]);
    }
  );
});
