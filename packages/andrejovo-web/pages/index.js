import Container from "react-bootstrap/Container";

import { QueryForm } from "../components/QueryForm";
import { Banner } from "../components/Banner";

import "./index.scss";

const Home = () => (
  <Container as="main" className="home-page">
    <Banner />
    <QueryForm />
  </Container>
);

export default Home;
