import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./QueryForm.scss";

export function QueryForm() {
  return (
    <Form className="query-form" action="search" method="get">
      <h1>Je to Andrejovo?</h1>
      <fieldset>
        <Form.Group controlId="q">
          <Form.Control
            name="q"
            type="text"
            placeholder="Např. Penam toustový chléb"
          />
          <Form.Text className="text-muted">
            Můžete zadat jakýkoliv text. Vyhledavač hledá v produktových jménech
            odkazy na značky a společnosti holdingu Agrofert.
          </Form.Text>
        </Form.Group>
      </fieldset>
      <div className="form-buttons">
        <Button type="submit" size="lg">
          Hledat v agrofertimpériu
        </Button>
      </div>
    </Form>
  );
}
