// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Container from "./Components/Layout/Container";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Layout/Footer";
import Denuncias from "./Components/Pages/Denuncias";
import Ranking from "./Components/Pages/Ranking";
import Partida from "./Components/Pages/Partida";
import Login from "./Components/Pages/Login";
import Cadastro from "./Components/Pages/Cadastro";
import EditarPerfil from "./Components/Pages/EditarPerfil";
import { AuthProvider } from "./contexts/AuthProvider";
import UsersProvider from "./contexts/UsersProvider";
import DenunciasProvider from "./contexts/DenunciasProvider";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <DenunciasProvider>
          <Router>
            <Navbar />
            <Container customClass="min_height">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/denuncias" element={<Denuncias />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/partida" element={<Partida />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/perfil" element={<EditarPerfil />} />
              </Routes>
            </Container>
            <Footer />
          </Router>
        </DenunciasProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
