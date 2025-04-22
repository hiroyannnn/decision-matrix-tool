import React from "react";
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardFooter as ShadcnCardFooter,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent
} from "../ui/card";

/**
 * Cardコンポーネント - shadcn/uiのCardをラップしたコンポーネント
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <ShadcnCard ref={ref} {...props} />;
});

Card.displayName = "Card";

/**
 * CardHeaderコンポーネント - shadcn/uiのCardHeaderをラップしたコンポーネント
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <ShadcnCardHeader ref={ref} {...props} />;
});

CardHeader.displayName = "CardHeader";

/**
 * CardFooterコンポーネント - shadcn/uiのCardFooterをラップしたコンポーネント
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <ShadcnCardFooter ref={ref} {...props} />;
});

CardFooter.displayName = "CardFooter";

/**
 * CardTitleコンポーネント - shadcn/uiのCardTitleをラップしたコンポーネント
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return <ShadcnCardTitle ref={ref} {...props} />;
});

CardTitle.displayName = "CardTitle";

/**
 * CardDescriptionコンポーネント - shadcn/uiのCardDescriptionをラップしたコンポーネント
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return <ShadcnCardDescription ref={ref} {...props} />;
});

CardDescription.displayName = "CardDescription";

/**
 * CardContentコンポーネント - shadcn/uiのCardContentをラップしたコンポーネント
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <ShadcnCardContent ref={ref} {...props} />;
});

CardContent.displayName = "CardContent";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
};
