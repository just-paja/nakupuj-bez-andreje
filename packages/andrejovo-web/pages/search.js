import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Router from "next/router";

import { Clean } from "../components/Clean";
import { matchBlacklistedBrand } from "../db";
import { MatchingBrand } from "../components/MatchingBrand";
import { QueryFormHeader } from "../components/QueryFormHeader";

function Search({ brand, query }) {
  const { q } = query;
  return (
    <>
      <QueryFormHeader q={q} />
      <Container as="main">
        <h1 className="text-center">"{q}" v Agrofertu</h1>
        {brand ? <MatchingBrand brand={brand} /> : <Clean />}
      </Container>
    </>
  );
}

Search.getInitialProps = function ({ query, res }) {
  const { q } = query;
  if (typeof window === "undefined" && res.writeHead) {
    if (!q) {
      res.writeHead(302, { Location: "/" });
      res.end();
    }
  }
  const match = matchBlacklistedBrand(q);
  return { brand: match && match.companyRef, query };
};

export default Search;
