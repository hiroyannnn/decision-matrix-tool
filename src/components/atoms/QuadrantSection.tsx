import React from "react";

export interface QuadrantSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  colorScheme?: "green" | "yellow" | "blue" | "red";
}

/**
 * QuadrantSectionコンポーネント - マトリックスの象限を表示するコンポーネント
 */
const QuadrantSection = React.forwardRef<HTMLDivElement, QuadrantSectionProps>(
  (
    { title, colorScheme = "green", children, className = "", ...props },
    ref,
  ) => {
    const bgColorClass = {
      green: "bg-green-50",
      yellow: "bg-yellow-50",
      blue: "bg-blue-50",
      red: "bg-red-50",
    }[colorScheme];

    return (
      <div
        ref={ref}
        className={`${bgColorClass} p-4 rounded ${className}`}
        {...props}
      >
        <h3 className="font-bold mb-2">{title}</h3>
        {children}
      </div>
    );
  },
);

QuadrantSection.displayName = "QuadrantSection";

export { QuadrantSection };
