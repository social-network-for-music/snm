import "@/styles/global.css";

import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import Head from "next/head";

import { Inter } from "next/font/google";

import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Social Network for Music</title>

        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      </Head>

      <div className={inter.className}>
        <ToastContainer
          theme="colored"
          position="top-center"
          pauseOnHover={false}

          closeOnClick={true}

          limit={3}

          className="md:!w-auto md:max-w-[550px]"
        />

        <Component {...pageProps} />
      </div>
    </div>
  );
}
