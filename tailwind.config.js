// tailwind.config.js

module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", // スタイルを適用するファイルのパス
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // カスタムテーマの拡張
      },
    },
    plugins: [
      // カスタムプラグインの追加
    ],
  };
  