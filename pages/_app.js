// pages/_app.js

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css'; // あなたのグローバルなスタイルファイル

// Create a new QueryClient instance
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools /> {/* 開発環境でのみ表示 */}
    </QueryClientProvider>
  );
}

export default MyApp;
