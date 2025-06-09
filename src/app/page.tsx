"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    if (text.trim() === "") return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-black text-center">
            リマインダー
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white mt-8 rounded-xl shadow-sm overflow-hidden">
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>

      <div className="h-20"></div>
    </div>
  );
}

/**
 * このページコンポーネントのポイント：
 *
 * 1. useState による状態管理
 *    - todos: TODOリストの状態を管理
 *    - 状態が変更されると自動的にUIが更新される
 *    - Reactの基本的な状態管理パターン
 *
 * 2. イベント処理関数
 *    - addTodo: 新しいTODOを追加
 *    - toggleTodo: 完了状態の切り替え
 *    - deleteTodo: TODOの削除
 *    - 各関数が明確な責任を持つ
 *
 * 3. 配列操作の基本
 *    - map: 配列の変換（状態更新）
 *    - filter: 配列の絞り込み（削除、統計計算）
 *    - スプレッド演算子: 配列への要素追加
 *
 * 4. プロップスによるデータの受け渡し
 *    - 親コンポーネント（このファイル）が状態を管理
 *    - 子コンポーネントには表示用のデータと操作用の関数を渡す
 *    - データの流れが分かりやすい
 *
 * 5. コンポーネントの分離
 *    - TodoInput: 入力処理
 *    - TodoList: リスト表示
 *    - TodoStats: 統計表示
 *    - 各コンポーネントが単一の責任を持つ
 *
 * 6. 初心者にとってのメリット
 *    - すべてのロジックが一つのファイルに集約
 *    - データの流れが追いやすい
 *    - デバッグしやすい
 *    - 段階的に理解を深められる
 */
