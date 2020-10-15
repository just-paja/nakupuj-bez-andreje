import Head from "next/head";
import getConfig from "next/config";
import Router from "next/router";

import { Footer } from "../components/Footer";

import "./_app.scss";

const { publicRuntimeConfig } = getConfig();
const { GTM_CODE } = publicRuntimeConfig;

function renderGtm() {
  if (!GTM_CODE) {
    return null
  }
  const innerHTML = {
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_CODE}');`
  }
  return <script dangerouslySetInnerHTML={innerHTML} />
}

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Je to Andrejovo?</title>
        <link rel="icon" href="/favicon.png" />
        {renderGtm()}
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;
