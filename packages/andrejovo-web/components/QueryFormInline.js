import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./QueryForm.scss";

export function QueryFormInline({ q }) {
  const [value, setValue] = useState(q);
  return (
    <Form className="query-form query-form-inline" action="search" method="get">
      <Form.Group controlId="q">
        <Form.Control
          name="q"
          type="text"
          placeholder="Např. Penam toustový chléb"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="outline-light">
        Hledat
      </Button>
    </Form>
  );
}
