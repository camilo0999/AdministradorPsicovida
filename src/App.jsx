import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Login from "./pages/Login";
import Doctores from "./pages/Doctores";
import HorarioAtencionDoctores from "./pages/HorarioAtencionDoctores";
import Citas from "./pages/Citas";
import ProtectedRoute from "./components/ProtectedRoute";
import Mensajes from "./pages/Mensajes";

function AppContent() {
  const location = useLocation();
  // Mostrar sidebar y navbar en todas las páginas excepto login
  const showSidebar = location.pathname !== "/";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {showSidebar && <Navbar />}
      <div style={{ display: "flex", flex: 1 }}>
        {showSidebar && <Sidebar />}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Inicio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pacientes"
              element={
                <ProtectedRoute>
                  <Pacientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctores"
              element={
                <ProtectedRoute>
                  <Doctores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/horario-atencion-doctores"
              element={
                <ProtectedRoute>
                  <HorarioAtencionDoctores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citas"
              element={
                <ProtectedRoute>
                  <Citas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mensajes"
              element={
                <ProtectedRoute>
                  <Mensajes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
