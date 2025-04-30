import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/Card';

type TitleStepProps = {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
};

export const TitleStep = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: TitleStepProps) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>マトリックスのタイトル</CardTitle>
    </CardHeader>
    <CardContent>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="例: 転職の選択、引っ越しの判断、など"
        className="w-full p-2 border rounded mb-4"
      />
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
