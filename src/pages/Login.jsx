import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contrasena) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await login(usuario, contrasena);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas. Intente nuevamente.");
      }
    } catch (err) {
      setError("Ocurrió un error al intentar iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <div className="login-brand">
          <div className="navbar-brand">
            <i className="fas fa-brain logo-icon"></i>
            <span className="logo-text">PsicoVida</span>
            <span className="logo-tagline">Salud Mental Integral</span>
          </div>
          <p className="login-description">
            Plataforma profesional para la gestión integral de pacientes y
            consultas psicológicas
          </p>
        </div>
        <div className="login-image">
          <div className="image-overlay"></div>
        </div>
      </div>

      <div className="login-right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Bienvenido de vuelta</h2>
            <p>Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <div className="form-group">
            <label htmlFor="usuario">
              <i className="fas fa-user icon"></i> Usuario
            </label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario"
              autoFocus
              className={error && !usuario ? "input-error" : ""}
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="contrasena">
              <i className="fas fa-key icon"></i> Contraseña
            </label>
            <div className="password-input-container">
              <input
                id="contrasena"
                type={showPassword ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingrese su contraseña"
                className={error && !contrasena ? "input-error" : ""}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          {error && (
            <div className="alert error">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recordar mi sesión</label>
            </div>
            <a href="#forgot-password" className="forgot-password">
              ¿Olvidó su contraseña?
            </a>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Iniciando sesión...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
              </>
            )}
          </button>

          <div className="login-footer">
            <p className="version">v2.1.0</p>
            <p className="copyright">
              © 2023 PsicoVida. Todos los derechos reservados.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
