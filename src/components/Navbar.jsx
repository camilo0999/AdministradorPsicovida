import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Imagen temporal de placeholder
  const logoUrl =
    "https://www.shutterstock.com/image-vector/natural-therapy-mind-health-logo-260nw-2315856679.jpg"; // Reemplazar por logo-clinica.png cuando esté disponible

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-brain logo-icon"></i>
        <span className="logo-text">PsicoVida</span>
        <span className="logo-tagline">Salud Mental Integral</span>
      </div>
      <div className="navbar-actions">
        <div className="user-info">
          <i className="fas fa-user-circle user-icon"></i>
          <span>Administrador</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
