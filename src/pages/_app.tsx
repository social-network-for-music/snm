import "@/styles/global.css";

import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import Head from "next/head";

import { Inter } from "next/font/google";

import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={inter.className}>
        <ToastContainer
          theme="colored"

          position="top-center"
        />

        <Component {...pageProps} />
      </div>
    </main>
  );
}
