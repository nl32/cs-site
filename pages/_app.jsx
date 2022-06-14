import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import { fetcher } from "../lib/swr";
import Head from "next/head";
import styles from "../styles/global.module.css";
export default function app({ Component, pageProps }) {
  return (
    <div className={styles.app}>
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
}
