import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Router from "next/router";

function Search({ query }) {
  const { q } = query;

  return (
    <Container as="main" className="home-page">
      Search {q}
    </Container>
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
  return { query };
};

export default Search;
