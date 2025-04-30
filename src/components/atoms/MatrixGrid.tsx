import React from "react";

export interface MatrixGridProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * MatrixGridコンポーネント - 4象限マトリックスのグリッドレイアウトを提供するコンポーネント
 */
const MatrixGrid = React.forwardRef<HTMLDivElement, MatrixGridProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid grid-cols-2 gap-4 mb-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MatrixGrid.displayName = "MatrixGrid";

export { MatrixGrid };
