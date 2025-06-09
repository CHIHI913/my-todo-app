/**
 * TodoStats.tsx - TODO統計情報コンポーネント
 *
 * このコンポーネントの役割：
 * - 未完了のTODO数を表示する
 * - TODOがない場合は何も表示しない（条件付きレンダリング）
 * - iOS風のフッター部分として機能する
 *
 * このファイルで学べる概念：
 * - 条件付きレンダリング（Early Return）
 * - nullの返却（何も表示しない場合）
 * - propsの受け取りと表示
 * - シンプルなプレゼンテーショナルコンポーネント
 */

// このコンポーネントが受け取るpropsの型定義
interface TodoStatsProps {
  remaining: number; // 未完了のTODO数
  total: number; // 全体のTODO数
}

/**
 * TODO統計情報コンポーネント
 * @param remaining - 未完了のTODO数
 * @param total - 全体のTODO数
 *
 * このコンポーネントは、iPhoneのリマインダーアプリの下部に表示される
 * 統計情報（「○件のリマインダー」）を再現しています
 */
export default function TodoStats({ remaining, total }: TodoStatsProps) {
  // Early Return パターン：TODOが一つもない場合は何も表示しない
  // null を返すと、そのコンポーネントは画面に何も表示されない
  if (total === 0) return null;

  // TODOがある場合の表示
  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
      <div className="text-xs text-gray-500 text-center">
        {/* 
          テンプレートリテラル（バッククォート`）を使った文字列の組み立て
          ${変数名} で変数の値を文字列に埋め込める
          
          remaining: 未完了のTODO数を表示
          例：「3 件のリマインダー」
        */}
        {remaining} 件のリマインダー
      </div>
    </div>
  );
}

/**
 * このコンポーネントのポイント：
 *
 * 1. 条件付きレンダリング（nullの返却）
 *    - TODOがない場合は何も表示しない
 *    - nullを返すことでReactは何もレンダリングしない
 *    - UIの一部を動的に表示/非表示にする基本パターン
 *
 * 2. プレゼンテーショナルコンポーネント
 *    - データの表示のみに特化
 *    - ビジネスロジックを含まない
 *    - 再利用しやすく、テストしやすい
 *
 * 3. iOS風デザインの再現
 *    - 背景色：gray-50（薄いグレー）
 *    - 境界線：上部にのみ薄いグレーのボーダー
 *    - テキスト：小さめのサイズで中央揃え
 *
 * 4. ユーザビリティの向上
 *    - 未完了のタスク数を常に表示
 *    - ユーザーが進捗を把握しやすい
 *    - 完了済みタスクではなく、残タスク数に焦点
 *
 * 5. シンプルな実装
 *    - 状態を持たない（ステートレス）
 *    - 副作用なし（Pure Component）
 *    - デバッグしやすい
 */
