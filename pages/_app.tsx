import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import { fetcher } from "../lib/swr";
import Head from "next/head";
import styles from "../styles/global.module.css";
import { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";
const app = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={styles.app}>
      <style jsx global>
        {`
          body {
            margin: 0px;
          }
        `}
      </style>
      <Head>
        <title>Mhs CS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig
        value={{ fetcher: fetcher, onError: (err) => console.log(err) }}
      >
        <Layout>
          <main>
            <Component {...pageProps} />
          </main>
        </Layout>
      </SWRConfig>
    </div>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    return {
      url
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 }}
    };
  },
  ssr: true
})(app);
