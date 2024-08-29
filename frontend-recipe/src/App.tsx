// import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Container className="my-2">
        <Outlet />{" "}
      </Container>
      <Footer />
    </>
  );
};

export default App;
