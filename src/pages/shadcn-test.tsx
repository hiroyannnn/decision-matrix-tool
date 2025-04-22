import React from "react";
import { Button } from "../components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/atoms/Card";

/**
 * shadcn/uiコンポーネントのテストページ
 * @returns {React.JSX.Element} テストページコンポーネント
 */
export default function ShadcnTest() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">shadcn/uiコンポーネントテスト</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Buttonコンポーネント</h2>
          <div className="flex flex-wrap gap-4">
            <Button>デフォルト</Button>
            <Button variant="destructive">削除</Button>
            <Button variant="outline">アウトライン</Button>
            <Button variant="secondary">セカンダリー</Button>
            <Button variant="ghost">ゴースト</Button>
            <Button variant="link">リンク</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button size="sm">小</Button>
            <Button size="default">中</Button>
            <Button size="lg">大</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cardコンポーネント</h2>
          <Card>
            <CardHeader>
              <CardTitle>カードタイトル</CardTitle>
              <CardDescription>カードの説明文をここに入力します。</CardDescription>
            </CardHeader>
            <CardContent>
              <p>カードのコンテンツ部分です。ここに主要な情報を記載します。</p>
            </CardContent>
            <CardFooter>
              <Button>アクション</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
