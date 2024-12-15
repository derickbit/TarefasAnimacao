// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Container from "./Components/Layout/Container";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Layout/Footer";
import Denuncias from "./Components/Pages/Denuncias";
import Ranking from "./Components/Pages/Ranking";
import Partida from "./Components/Pages/Partida";

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min_height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/denuncias" element={<Denuncias />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/partida" element={<Partida />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
