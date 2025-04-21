import React from "react";
import DecisionMatrixApp from "../src/components/DecisionMatrixApp";

/**
 * 決断マトリックスツールのホームページ
 * @returns {React.JSX.Element} ホームページコンポーネント
 */
export default function Home() {
  return (
    <div className="App">
      <DecisionMatrixApp />
    </div>
  );
}
