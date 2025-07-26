import "../styles/Inicio.css";

function Inicio() {
  return (
    <div className="inicio-container">
      <div className="inicio-content">
        <h1>Bienvenido al Sistema de Gestión de Citas Médicas</h1>
        <p className="inicio-subtitle">
          Tu plataforma integral para la administración eficiente de citas
          médicas
        </p>

        <div className="welcome-section">
          <div className="welcome-text">
            <h2>¿Qué puedes hacer con este sistema?</h2>
            <p>
              Nuestro sistema te permite gestionar de manera integral todos los
              aspectos de tu consultorio médico desde una interfaz moderna y
              fácil de usar.
            </p>
          </div>
        </div>

        <div className="modules-section">
          <h2>Módulos Disponibles</h2>

          <div className="modules-grid">
            <div className="module-card">
              <div className="module-icon">👥</div>
              <h3>Pacientes</h3>
              <p>
                Gestiona la información completa de tus pacientes: datos
                personales, historial médico, contactos de emergencia y más.
                Mantén un registro organizado y accesible de todos tus
                pacientes.
              </p>
            </div>

            <div className="module-card">
              <div className="module-icon">👨‍⚕️</div>
              <h3>Doctores</h3>
              <p>
                Administra el personal médico: especialidades, credenciales,
                información de contacto y asignación de consultorios. Organiza
                tu equipo médico de manera eficiente.
              </p>
            </div>

            <div className="module-card">
              <div className="module-icon">📅</div>
              <h3>Horarios de Atención</h3>
              <p>
                Configura y gestiona los horarios de atención de cada doctor.
                Define días laborables, horarios disponibles y excepciones.
                Optimiza la disponibilidad de tu personal médico.
              </p>
            </div>

            <div className="module-card">
              <div className="module-icon">📋</div>
              <h3>Citas</h3>
              <p>
                Programa y administra citas médicas de forma intuitiva.
                Visualiza el calendario, gestiona confirmaciones, cancelaciones
                y reprogramaciones. Mantén un control total sobre la agenda
                médica.
              </p>
            </div>

            <div className="module-card">
              <div className="module-icon">💬</div>
              <h3>Mensajes</h3>
              <p>
                Comunícate directamente con pacientes y personal médico a través
                del sistema integrado de mensajería. Envía recordatorios de
                citas, confirmaciones y notificaciones importantes.
              </p>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2>Características Principales</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Sistema seguro con autenticación de usuarios</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Interfaz rápida y responsiva</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Compatible con dispositivos móviles</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <span>Sincronización en tiempo real</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <span>Reportes y estadísticas detalladas</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Diseño moderno y fácil de usar</span>
            </div>
          </div>
        </div>

        <div className="getting-started">
          <h2>¿Cómo empezar?</h2>
          <p>
            Utiliza el menú lateral para navegar entre los diferentes módulos.
            Cada sección está diseñada para ser intuitiva y fácil de usar.
            ¡Comienza explorando las opciones disponibles!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
