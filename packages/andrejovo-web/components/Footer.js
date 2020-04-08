import React from "react";
import Container from "react-bootstrap/Container";

import "./Footer.scss";

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        Projekt <a href="https://andrejovo.cz">Andrejovo</a> má za cíl zmapovat
        celé impérium Andreje Babiše.
      </Container>
    </footer>
  );
}
