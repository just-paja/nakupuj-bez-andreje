import Container from "react-bootstrap/Container";
import React from "react";

import { QueryFormInline } from "./QueryFormInline";

import "./QueryFormHeader.scss";

export function QueryFormHeader({ q }) {
  return (
    <div className="query-form-header">
      <Container>
        <QueryFormInline q={q} />
      </Container>
    </div>
  );
}
