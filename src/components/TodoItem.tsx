/**
 * TodoItem.tsx - 個別のTODOアイテムコンポーネント
 *
 * このコンポーネントの役割：
 * - 一つのTODOアイテムを表示する
 * - 完了/未完了の切り替え機能
 * - TODOの削除機能
 * - iOS風のデザインでの表示
 *
 * このファイルで学べる概念：
 * - propsを使った親子間のデータ受け渡し
 * - 条件付きスタイリング（完了状態に応じた見た目の変更）
 * - SVGアイコンの使用
 * - 関数の呼び出し（コールバック）
 */

import { Todo } from "@/types/todo";

// このコンポーネントが受け取るpropsの型定義
// 親コンポーネントから必要なデータと関数を受け取る
interface TodoItemProps {
  todo: Todo; // 表示するTODOアイテムのデータ
  onToggle: (id: number) => void; // 完了状態を切り替える関数
  onDelete: (id: number) => void; // TODOを削除する関数
}

/**
 * 個別のTODOアイテムコンポーネント
 * @param todo - 表示するTODOアイテムのデータ
 * @param onToggle - 完了状態を切り替える時に呼び出される関数
 * @param onDelete - 削除する時に呼び出される関数
 */
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // JSXを返す（このTODOアイテムの見た目を定義）
  return (
    <div className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
      {/* 
        チェックボックス（iOS風の丸いデザイン）
        
        なぜbuttonを使う？：
        - ユーザーがクリックできることが明確
        - キーボードでの操作もサポート
        - アクセシビリティ（障害者支援）の向上
      */}
      <button
        onClick={() => onToggle(todo.id)} // クリック時に親コンポーネントの関数を呼び出し
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
          // 三項演算子（条件 ? true時の値 : false時の値）を使った条件付きスタイリング
          todo.completed
            ? "bg-blue-500 border-blue-500" // 完了している場合：青い背景
            : "border-gray-300 hover:border-gray-400" // 未完了の場合：グレーの境界線
        }`}
      >
        {/* 
          条件付きレンダリング：完了している場合のみチェックマークを表示
          && 演算子：左側がtrueの場合のみ右側を実行
        */}
        {todo.completed && (
          // SVG（Scalable Vector Graphics）：ベクター形式の画像
          // メリット：拡大縮小してもきれい、カラー変更が簡単、軽量
          <svg
            className="w-3 h-3 text-white" // サイズと色を指定
            fill="none" // 塗りつぶしなし
            stroke="currentColor" // 線の色は親要素のtext-colorを使用
            viewBox="0 0 24 24" // SVGの表示領域を指定
          >
            {/* チェックマークのパス（線の軌跡）を定義 */}
            <path
              strokeLinecap="round" // 線の端を丸くする
              strokeLinejoin="round" // 線の接続部分を丸くする
              strokeWidth={3} // 線の太さ
              d="M5 13l4 4L19 7" // チェックマークの形を定義
            />
          </svg>
        )}
      </button>

      {/* 
        タスクテキスト
        
        spanタグ：文字列を表示するためのHTMLタグ
        条件付きスタイリング：完了状態に応じて見た目を変える
      */}
      <span
        className={`flex-1 text-base leading-relaxed ${
          todo.completed
            ? "line-through text-gray-400" // 完了時：取り消し線 + 薄いグレー
            : "text-black" // 未完了時：黒色
        }`}
      >
        {todo.text} {/* TODOの内容を表示 */}
      </span>

      {/* 
        削除ボタン（iOS風）
        
        ゴミ箱アイコンを使用してTODOを削除する機能
        ホバー時の色変更でユーザビリティを向上
      */}
      <button
        onClick={() => onDelete(todo.id)} // クリック時に削除関数を呼び出し
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
      >
        {/* ゴミ箱アイコンのSVG */}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* ゴミ箱の形を定義するパス */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

/**
 * このコンポーネントのポイント：
 *
 * 1. プレゼンテーショナルコンポーネント
 *    - データの表示に特化
 *    - ビジネスロジックは含まない
 *    - 再利用しやすい
 *
 * 2. 条件付きスタイリング
 *    - todo.completedの状態に応じて見た目を変更
 *    - ユーザーに視覚的フィードバックを提供
 *
 * 3. イベント処理とコールバック
 *    - onToggle、onDeleteを使って親コンポーネントに処理を委譲
 *    - 責任の分離：表示は子、データ操作は親
 *
 * 4. アクセシビリティの配慮
 *    - buttonタグの使用でキーボード操作をサポート
 *    - hover状態の提供でユーザビリティ向上
 *
 * 5. TailwindCSSクラスの活用
 *    - 効率的なスタイリング
 *    - レスポンシブデザイン
 *    - 統一感のある見た目
 */
