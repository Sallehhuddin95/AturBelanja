import { useState } from "react";
import { Footer, Header } from "./components";
import { MainScreen } from "./screens";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="bg-secondary bg-opacity-25 h-auto">
      <Header />
      <MainScreen />
      <Footer />
    </div>
  );
}

export default App;
