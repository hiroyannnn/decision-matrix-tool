import React from "react";

export interface ItemListProps extends React.HTMLAttributes<HTMLUListElement> {}

/**
 * ItemListコンポーネント - マトリックス内の項目リストを表示するコンポーネント
 */
const ItemList = React.forwardRef<HTMLUListElement, ItemListProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <ul ref={ref} className={`list-disc pl-5 ${className}`} {...props}>
        {children}
      </ul>
    );
  },
);

ItemList.displayName = "ItemList";

export interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {}

/**
 * Itemコンポーネント - マトリックス内の項目を表示するコンポーネント
 */
const Item = React.forwardRef<HTMLLIElement, ItemProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <li ref={ref} className={className} {...props}>
        {children}
      </li>
    );
  },
);

Item.displayName = "Item";

export { ItemList, Item };
