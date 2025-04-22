import React from "react";
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from "../ui/button";

export interface ButtonProps extends ShadcnButtonProps {}

/**
 * Buttonコンポーネント - shadcn/uiのButtonをラップしたコンポーネント
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <ShadcnButton ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
