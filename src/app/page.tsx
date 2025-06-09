/**
 * page.tsx - TODOアプリのメインページ
 *
 * Next.jsのApp Routerにおけるページファイル：
 * - src/app/page.tsx は ルート（/）のページを表す
 * - このファイルがブラウザでアクセスした時に最初に表示される
 * - Next.jsは自動的にこのファイルをルートとして認識する
 *
 * このファイルで学べる概念：
 * - 'use client' ディレクティブ
 * - カスタムフックの使用
 * - コンポーネントの組み合わせ
 * -状態管理と表示の分離
 */

"use client"; // Next.jsのクライアントコンポーネントとして動作させるためのディレクティブ

// 必要なモジュールをインポート
import { useTodos } from "@/hooks/useTodos"; // 自作のカスタムフック
import TodoInput from "@/components/TodoInput"; // 入力コンポーネント
import TodoList from "@/components/TodoList"; // リスト表示コンポーネント
import TodoStats from "@/components/TodoStats"; // 統計情報コンポーネント

/**
 * メインページコンポーネント
 *
 * このコンポーネントの役割：
 * - アプリケーション全体のレイアウトを定義
 * - 各子コンポーネントを組み合わせて完全なTODOアプリを構成
 * - カスタムフックから状態と関数を取得
 * - 各子コンポーネントに適切なpropsを渡す
 */
export default function Home() {
  // カスタムフック（useTodos）から状態と操作関数を取得
  // 分割代入（デストラクチャリング）を使用して必要な値を取り出す
  const { todos, addTodo, toggleTodo, deleteTodo, stats } = useTodos();

  // JSXを返す（アプリの見た目を定義）
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 
        ヘッダー部分
        
        iOS風のシンプルなヘッダーデザイン：
        - 白い背景
        - 下部に薄いグレーの境界線
        - 中央に大きなタイトル
      */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-black text-center">
            リマインダー
          </h1>
        </div>
      </div>

      {/* 
        メインコンテンツエリア
        
        デザインのポイント：
        - 中央寄せで最大幅を制限（max-w-md）
        - 白い背景のカード風デザイン
        - 角丸（rounded-xl）と影（shadow-sm）
        - overflow-hiddenで角丸の内側をクリップ
      */}
      <div className="max-w-md mx-auto bg-white mt-8 rounded-xl shadow-sm overflow-hidden">
        {/* 
          新しいリマインダー追加エリア
          
          TodoInputコンポーネントに以下を渡す：
          - onAddTodo: TODOを追加するための関数
        */}
        <TodoInput onAddTodo={addTodo} />

        {/* 
          TODOリスト表示エリア
          
          TodoListコンポーネントに以下を渡す：
          - todos: 現在のTODOリスト（配列）
          - onToggleTodo: 完了状態を切り替える関数
          - onDeleteTodo: TODOを削除する関数
        */}
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />

        {/* 
          統計情報表示エリア
          
          TodoStatsコンポーネントに以下を渡す：
          - remaining: 未完了のTODO数
          - total: 全体のTODO数
          
          注意：statsオブジェクトから必要な値を取り出して渡している
        */}
        <TodoStats remaining={stats.remaining} total={stats.total} />
      </div>

      {/* 
        下部の余白
        
        ページの最下部に余白を追加：
        - スクロール時の見た目を改善
        - モバイルでの操作しやすさを向上
      */}
      <div className="h-20"></div>
    </div>
  );
}

/**
 * このページコンポーネントのポイント：
 *
 * 1. App Routerの活用
 *    - Next.js 13+の新しいルーティングシステム
 *    - ファイルベースルーティング
 *    - page.tsxが自動的にルートページになる
 *
 * 2. 'use client' ディレクティブ
 *    - このコンポーネントがブラウザで実行されることを指定
 *    - useState、useEffectなどのReactフックを使用する場合に必要
 *    - サーバーサイドレンダリングとクライアントサイドレンダリングの制御
 *
 * 3. カスタムフックの活用
 *    - ビジネスロジックを分離
 *    - UIコンポーネントをシンプルに保つ
 *    - 再利用性とテスタビリティの向上
 *
 * 4. コンポーネント合成パターン
 *    - 小さなコンポーネントを組み合わせて大きな機能を作る
 *    - 単一責任の原則に従った設計
 *    - メンテナンス性とデバッグの容易さ
 *
 * 5. プロップスの受け渡し
 *    - 親コンポーネントから子コンポーネントへのデータの流れ
 *    - 関数をpropsとして渡すことでイベント処理を実現
 *    - Reactの単方向データフローの実装
 *
 * 6. レスポンシブデザイン
 *    - max-w-mdでモバイルファーストのデザイン
 *    - TailwindCSSによる効率的なスタイリング
 *    - iOS風のクリーンなデザイン
 */
