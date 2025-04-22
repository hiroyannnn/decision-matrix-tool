import React, { useEffect } from "react";

/**
 * 「全体の振り返り」の表示/非表示を切り替えるためのチェックボックス
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.showReflection - 現在の表示状態
 * @param {Function} props.setShowReflection - 表示状態を更新する関数
 * @returns {React.JSX.Element} チェックボックスコンポーネント
 */
const ReflectionVisibilityToggle: React.FC<{
  showReflection: boolean;
  setShowReflection: (show: boolean) => void;
}> = ({ showReflection, setShowReflection }) => {
  useEffect(() => {
    const styles = `
      .mr-2 {
        margin-right: 0.5rem;
      }
    `;
    
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        id="show-reflection"
        checked={showReflection}
        onChange={(e) => setShowReflection(e.target.checked)}
        className="mr-2"
      />
      <label htmlFor="show-reflection" className="text-sm">
        「全体の振り返り」を表示する
      </label>
    </div>
  );
};

export default ReflectionVisibilityToggle;
