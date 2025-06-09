/**
 * TodoList.tsx - TODOリスト表示コンポーネント
 *
 * このコンポーネントの役割：
 * - TODOの配列を受け取って、それらを一覧表示する
 * - TODOがない場合の表示を管理する
 * - 各TODOアイテムにイベント処理関数を渡す
 *
 * このファイルで学べる概念：
 * - 配列のマップ処理（map関数）
 * - 条件付きレンダリング（三項演算子）
 * - コンポーネントの合成（複数のコンポーネントを組み合わせる）
 * - プロップスドリリング（親から子へのデータ受け渡し）
 */

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

// このコンポーネントが受け取るpropsの型定義
interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

/**
 * TODOリスト表示コンポーネント
 * @param todos - 表示するTODOの配列
 * @param onToggleTodo - 完了状態を切り替える時に呼び出される関数
 * @param onDeleteTodo - 削除する時に呼び出される関数
 */
export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  // Early Return パターン：条件に応じて早期リターンする
  // TODOが一つもない場合の表示
  if (todos.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-base">リマインダーなし</div>
      </div>
    );
  }

  // TODOがある場合の表示
  return (
    <div className="divide-y divide-gray-100">
      {/* 
        map関数を使った配列のレンダリング
        
        map関数：
        - 配列の各要素に対して処理を実行
        - 新しい配列を作成して返す
        - Reactでは配列をJSX要素に変換するためによく使用される
        
        keyプロパティ：
        - Reactが各要素を識別するために必要
        - 要素の追加・削除・並び替えを効率的に処理
        - ユニークな値を指定する必要がある
      */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
}

/**
 * このコンポーネントのポイント：
 *
 * 1. 条件付きレンダリングのパターン
 *    - Early Return: 条件に応じて早期にreturnする
 *    - コードの可読性が向上
 *    - ネストが深くなることを防ぐ
 *
 * 2. 配列のレンダリング
 *    - map関数を使って配列をJSX要素に変換
 *    - keyプロパティでReactの仮想DOMを最適化
 *    - 動的なリスト表示の基本パターン
 *
 * 3. プロップスドリリング
 *    - 親から受け取った関数を子コンポーネントに渡す
 *    - データの流れを明確にする
 *    - 責任の分離を実現
 *
 * 4. コンポーネントの合成
 *    - TodoItemコンポーネントを再利用
 *    - 単一責任の原則に従った設計
 *    - メンテナンス性の向上
 *
 * 5. ユーザーエクスペリエンス
 *    - 空の状態（Empty State）の適切な表示
 *    - ユーザーに分かりやすいメッセージ
 *    - 視覚的な境界線で項目を区別
 */
