import React from "react";
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from "../ui/button";

export type ButtonProps = ShadcnButtonProps & {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

/**
 * Buttonコンポーネント - shadcn/uiのButtonをラップしたコンポーネント
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <ShadcnButton ref={ref} {...props} />;
  },
);

Button.displayName = "Button";

export { Button };
