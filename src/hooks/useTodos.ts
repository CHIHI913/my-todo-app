/**
 * TODOの状態管理カスタムフック
 *
 * Reactのカスタムフックとは：
 * - コンポーネント間で状態管理ロジックを共有するための仕組み
 * - 関数名は必ず "use" で始める必要がある
 * - 複数のコンポーネントで同じロジックを使い回すことができる
 * - コードの重複を防ぎ、保守性を向上させる
 */

"use client"; // Next.jsでクライアントサイドの機能を使うために必要

import { useState } from "react"; // Reactの状態管理フック
import { Todo } from "@/types/todo"; // 型定義をインポート

// TODOの状態管理カスタムフック
// この関数は、TODOリストの状態とそれを操作する関数をまとめて提供します
export const useTodos = () => {
  // useState: Reactで状態を管理するためのフック
  // todos: 現在の状態（TODOの配列）
  // setTodos: 状態を更新するための関数
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * 新しいTODOを追加する関数
   * @param text - 追加するTODOのテキスト
   *
   * 動作の流れ：
   * 1. 空文字チェック（無効な入力を防ぐ）
   * 2. 新しいTODOオブジェクトを作成
   * 3. 既存のリストに新しいTODOを追加
   */
  const addTodo = (text: string) => {
    // 空文字や空白のみの場合は何もしない
    if (text.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(), // 現在時刻をIDとして使用（簡易的な一意ID生成）
      text: text.trim(), // 前後の空白を削除
      completed: false, // 新しいTODOは未完了状態
    };

    // スプレッド演算子（...）を使って既存の配列に新しい要素を追加
    // Reactでは元の配列を直接変更せず、新しい配列を作成する必要がある
    setTodos((prev) => [...prev, newTodo]);
  };

  /**
   * TODOの完了状態を切り替える関数
   * @param id - 切り替えるTODOのID
   *
   * map関数を使って配列の中から特定のTODOを見つけて更新します
   */
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        // 指定されたIDのTODOの場合、completed状態を反転
        // そうでない場合は、元のTODOをそのまま返す
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * TODOを削除する関数
   * @param id - 削除するTODOのID
   *
   * filter関数を使って、指定されたID以外のTODOのみを残します
   */
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * 統計情報を計算
   * TODOの総数、完了数、未完了数を計算して返します
   *
   * filter関数：条件に一致する要素のみを抽出
   * length：配列の要素数を取得
   */
  const stats = {
    total: todos.length, // 全体の数
    completed: todos.filter((todo) => todo.completed).length, // 完了した数
    remaining: todos.filter((todo) => !todo.completed).length, // 未完了の数
  };

  // このフックが返すもの：
  // - todos: 現在のTODOリスト
  // - 操作関数: addTodo, toggleTodo, deleteTodo
  // - stats: 統計情報
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    stats,
  };
};

/**
 * カスタムフックの利点：
 * 1. ロジックの再利用性：他のコンポーネントでも同じロジックを使える
 * 2. テストしやすい：ロジックが分離されているのでテストが書きやすい
 * 3. コンポーネントがシンプルになる：UI表示に集中できる
 * 4. 関心の分離：状態管理とUI表示の責任が明確に分かれる
 */
