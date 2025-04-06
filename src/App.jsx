import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { RankingProvider } from "./contexts/RankingProvider";
import { PartidasProvider } from "./contexts/PartidasProvider";
import ProtectedRoute from "./Config/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  // Rotas onde a Navbar não aparece
  const hideNavbarRoutes = ["/login", "/cadastro"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Container customClass="min_height">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/denuncias"
            element={
              <ProtectedRoute>
                <Denuncias />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <Ranking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partida"
            element={
              <ProtectedRoute>
                <Partida />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <EditarPerfil />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <DenunciasProvider>
          <PartidasProvider>
            <RankingProvider>
              <Router>
                <AppContent />
              </Router>
            </RankingProvider>
          </PartidasProvider>
        </DenunciasProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
