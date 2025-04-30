import type React from "react";

/**
 * マトリックスの表示/非表示を切り替えるためのチェックボックス
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.showReflection - 現在の表示状態
 * @param {Function} props.setShowReflection - 表示状態を更新する関数
 * @returns {React.JSX.Element} チェックボックスコンポーネント
 */
export const ReflectionVisibilityToggle: React.FC<{
  showReflection: boolean;
  setShowReflection: (show: boolean) => void;
}> = ({ showReflection, setShowReflection }) => {
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
        マトリックスを表示する
      </label>
    </div>
  );
};
