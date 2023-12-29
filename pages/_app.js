// pages/_app.js

import '../styles/globals.css'; // グローバルなスタイルを適用するためのファイル

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
