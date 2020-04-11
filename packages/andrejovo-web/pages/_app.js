import Head from "next/head";
import getConfig from "next/config";
import Router from "next/router";
import withGA from "next-ga";

import { Footer } from "../components/Footer";

import "./_app.scss";

const { publicRuntimeConfig } = getConfig();
const { GA_CODE } = publicRuntimeConfig;

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Je to Andrejovo?</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default withGA(GA_CODE, Router)(App);
