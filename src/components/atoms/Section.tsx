import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Sectionコンポーネント - コンテンツのセクションを表示するコンポーネント
 */
const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`mb-6 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Section.displayName = "Section";

export { Section };
