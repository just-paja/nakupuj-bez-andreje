import Head from "next/head";

import { Footer } from "../components/Footer";

import "./_app.scss";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Je to Andrejovo?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;
