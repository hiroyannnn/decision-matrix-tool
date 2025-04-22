import React from "react";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * TextInputコンポーネント - テキスト入力フィールドを提供するコンポーネント
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`p-2 border rounded ${className}`}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * TextAreaコンポーネント - 複数行テキスト入力フィールドを提供するコンポーネント
 */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`p-2 border rounded ${className}`}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export { TextInput, TextArea };
