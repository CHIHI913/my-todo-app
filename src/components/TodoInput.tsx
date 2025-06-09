/**
 * TodoInput.tsx - タスク入力コンポーネント
 *
 * このコンポーネントの役割：
 * - ユーザーから新しいTODOの入力を受け取る
 * - 入力内容を親コンポーネントに伝える
 * - 入力フィールドをクリアする
 *
 * Reactコンポーネントの基本概念：
 * - props: 親コンポーネントから受け取るデータ
 * - state: コンポーネント内部で管理する状態
 * - イベント処理: ユーザーの操作に反応する処理
 */

"use client"; // Next.jsでクライアントサイドの機能を使うために必要

import { useState } from "react"; // Reactの状態管理フック

// このコンポーネントが受け取るpropsの型定義
// interfaceで定義することで、どんなpropsが必要かが明確になる
interface TodoInputProps {
  onAddTodo: (text: string) => void; // 親コンポーネントから渡される関数
}

/**
 * TODOの入力コンポーネント
 * @param onAddTodo - 新しいTODOを追加する時に呼び出される関数（親コンポーネントから渡される）
 */
export default function TodoInput({ onAddTodo }: TodoInputProps) {
  // useState: このコンポーネント内部で入力テキストの状態を管理
  // inputText: 現在の入力内容
  // setInputText: 入力内容を更新する関数
  const [inputText, setInputText] = useState("");

  /**
   * TODOを追加してフィールドをクリアする関数
   *
   * なぜ関数を分ける？：
   * - 同じ処理を複数の場所で使いたい（ボタンクリック、Enterキー）
   * - コードの重複を避ける
   * - 処理の意味を明確にする
   */
  const handleAddTodo = () => {
    // 親コンポーネントから渡された関数を呼び出し、入力内容を渡す
    onAddTodo(inputText);

    // 入力フィールドを空にする
    setInputText("");
  };

  /**
   * Enterキーが押された時の処理
   * @param e - キーボードイベントオブジェクト
   *
   * イベントオブジェクト：
   * - ユーザーの操作（キー押下、クリックなど）の情報を含む
   * - どのキーが押されたか、マウスの位置などが分かる
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Enterキーが押された場合のみ処理を実行
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  // JSXを返す（コンポーネントの見た目を定義）
  // JSX: JavaScriptの中でHTML風の記述ができる構文
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* 装飾用の丸いアイコン（iOSリマインダー风のデザイン） */}
        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>

        {/* 入力フィールド */}
        <input
          type="text"
          value={inputText} // 現在の入力内容を表示
          onChange={(e) => setInputText(e.target.value)} // 入力内容が変わったら状態を更新
          onKeyPress={handleKeyPress} // キーが押されたら関数を実行
          placeholder="新しいリマインダー" // 入力欄に表示されるヒントテキスト
          className="flex-1 text-base text-black bg-transparent outline-none placeholder-gray-500 font-medium"
        />

        {/* 
          条件付きレンダリング：テキストが入力されている時のみボタンを表示
          && 演算子：左側がtrueの時のみ右側を実行
          trim(): 文字列の前後の空白を削除
        */}
        {inputText.trim() && (
          <button
            onClick={handleAddTodo} // クリックされたら関数を実行
            className="text-blue-500 font-medium text-sm px-2 py-1 rounded"
          >
            追加
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * このコンポーネントのポイント：
 *
 * 1. 制御されたコンポーネント（Controlled Component）
 *    - inputの値をReactの状態で管理
 *    - ユーザーの入力を即座に状態に反映
 *
 * 2. props による親子間通信
 *    - 親から関数を受け取り、必要な時に呼び出す
 *    - データの流れが明確（親→子、子→親）
 *
 * 3. イベント処理
 *    - onChange: 入力内容の変化を検知
 *    - onKeyPress: キーボード操作を検知
 *    - onClick: クリック操作を検知
 *
 * 4. 条件付きレンダリング
 *    - 状態に応じてUIを動的に変更
 *    - ユーザビリティの向上
 */
