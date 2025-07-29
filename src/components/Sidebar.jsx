import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { useAuth } from "../AuthContext";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <i className="fas fa-brain logo-icon"></i>
        <span>Panel de Control</span>
      </div>
      <nav>
        <ul className="sidebar-menu">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <i className="fas fa-home"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <li className={location.pathname === "/pacientes" ? "active" : ""}>
            <Link to="/pacientes">
              <i className="fas fa-user-injured"></i>
              <span>Pacientes</span>
            </Link>
          </li>
          <li className={location.pathname === "/doctores" ? "active" : ""}>
            <Link to="/doctores">
              <i className="fas fa-user-md"></i>
              <span>Psicologos</span>
            </Link>
          </li>
          <li>
            <Link to="/horario-atencion-doctores">
              <i className="fas fa-calendar-check"></i>
              <span>Horario de Atención</span>
            </Link>
          </li>
          <li>
            <Link to="/citas">
              <i className="fas fa-calendar-check"></i>
              <span>Citas</span>
            </Link>
          </li>
          <li>
            <Link to="/mensajes">
              <i className="fas fa-envelope"></i>
              <span>Mensajes</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-info">
          <i className="fas fa-user-circle"></i>
          <span>Administrador</span>
        </div>
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
