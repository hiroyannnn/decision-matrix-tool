import { useRouter } from "next/router";
import React from "react";
import { DecisionMatrixApp } from "../components/DecisionMatrixApp";

/**
 * 決断マトリックスツールのホームページ
 * @returns {React.JSX.Element} ホームページコンポーネント
 */
export default function Home() {
  const router = useRouter();
  const { step } = router.query;

  return (
    <div className="App">
      <DecisionMatrixApp currentStep={step ? Number(step) : 0} />
    </div>
  );
}
