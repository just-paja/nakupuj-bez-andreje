import Head from "next/head";
import Container from "react-bootstrap/Container";

import { Banner } from "../components/Banner";
import { ExtensionPromo } from "../components/ExtensionPromo";
import { QueryForm } from "../components/QueryForm";

import "./index.scss";

const Home = () => (
  <Container as="main" className="home-page">
    <Head>
      <meta name="title" content="Je to Andrejovo?" />
      <meta
        name="description"
        content="Jednoduchý vyhledavač, který vám pomůže zjistit, jestli produkt patří do Agrofertu Andreje Babiše."
      />
    </Head>
    <Banner />
    <QueryForm />
    <ExtensionPromo />
  </Container>
);

export default Home;
