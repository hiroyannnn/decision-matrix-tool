import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/Card';

type TitleStepProps = {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  showError?: boolean;
};

export const TitleStep = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  showError = false,
}: TitleStepProps) => {
  const [localShowError, setLocalShowError] = useState(false);
  
  const handleTitleChange = (value: string) => {
    onTitleChange(value);
    if (value.trim() !== '') {
      setLocalShowError(false);
    }
  };
  
  const displayError = showError || localShowError;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>マトリックスのタイトル <span className="text-red-500">*</span></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="例: 転職の選択、引っ越しの判断、など"
            className={`w-full p-2 border rounded ${displayError ? 'border-red-500' : ''}`}
          />
          {displayError && <p className="text-red-500 text-sm mt-1">タイトルを入力してください</p>}
        </div>
        <CardTitle className="text-xl font-semibold mb-2">
          詳細情報 (オプション)
        </CardTitle>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="選択肢についての詳細や背景など"
          className="w-full p-2 border rounded h-24"
        />
      </CardContent>
    </Card>
  );
};
