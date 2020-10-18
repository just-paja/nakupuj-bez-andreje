import Head from "next/head";
import getConfig from "next/config";
import Router from "next/router";

import { Footer } from "../components/Footer";

import "./_app.scss";


function Gtm() {
  const config = getConfig();
  const { publicRuntimeConfig } = config
  const { GTM_CODE } = publicRuntimeConfig;
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
  return <Head><script dangerouslySetInnerHTML={innerHTML} /></Head>
}

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Je to Andrejovo?</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Gtm />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;
