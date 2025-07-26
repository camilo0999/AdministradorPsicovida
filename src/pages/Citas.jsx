import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Doctores.css";

function Citas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [successMensaje, setSuccessMensaje] = useState("");
  const [confirmarLoading, setConfirmarLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetch(
          "https://aplicacion-jfw5.onrender.com/api/v1/cita"
        );
        if (!response.ok) throw new Error("Error en la respuesta");
        const data = await response.json();
        setCitas(data);
      } catch (err) {
        setError("Error al cargar las citas");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchDoctores = async () => {
      try {
        const response = await fetch(
          "https://aplicacion-jfw5.onrender.com/api/v1/doctor"
        );
        if (!response.ok) throw new Error("Error en la respuesta de doctores");
        const data = await response.json();
        // setDoctores(data.doctores || data || []); // This line is removed
      } catch (err) {
        // No bloquea la carga de citas si falla doctores
        console.error("Error doctores:", err);
      }
    };
    fetchCitas();
    fetchDoctores();
  }, []);

  const abrirModalVer = (cita) => {
    setCitaSeleccionada(cita);
    setModalVerOpen(true);
  };

  const cerrarModalVer = () => {
    setModalVerOpen(false);
    setCitaSeleccionada(null);
  };

  const confirmarCita = async (idCita) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas confirmar esta cita?"
    );
    if (!confirmar) return;
    setConfirmarLoading(true);
    setSuccessMensaje("");
    setError("");
    try {
      const response = await fetch(
        `https://aplicacion-jfw5.onrender.com/api/v1/cita/confirmar/${idCita}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("No se pudo confirmar la cita");
      setSuccessMensaje("Cita confirmada exitosamente");
      // Refrescar citas
      const res = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/cita"
      );
      const data = await res.json();
      setCitas(data);
    } catch (err) {
      setError("Error al confirmar la cita");
    } finally {
      setConfirmarLoading(false);
    }
  };

  const cancelarCita = async (idCita) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas cancelar esta cita?"
    );
    if (!confirmar) return;
    setConfirmarLoading(true);
    setSuccessMensaje("");
    setError("");
    try {
      const response = await fetch(
        `https://aplicacion-jfw5.onrender.com/api/v1/cita/cancelar/${idCita}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("No se pudo cancelar la cita");
      setSuccessMensaje("Cita cancelada exitosamente");
      // Refrescar citas
      const res = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/cita"
      );
      const data = await res.json();
      setCitas(data);
    } catch (err) {
      setError("Error al cancelar la cita");
    } finally {
      setConfirmarLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <main className="main-content">
          <div className="content-header">
            <h1>
              <i className="fas fa-calendar-check"></i> Gestión de Citas
            </h1>
            <p>Administración de las citas médicas</p>
          </div>
          <section className="card-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-list"></i> Listado de Citas
              </h2>
              <div className="section-actions">
                <select
                  className="form-input"
                  style={{ minWidth: 180 }}
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="CONFIRMADO">CONFIRMADO</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="CANCELADA">CANCELADA</option>
                </select>
              </div>
            </div>
            {loading ? (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin"></i> Cargando citas...
              </div>
            ) : error ? (
              <div className="error-state">
                <i className="fas fa-exclamation-triangle"></i> {error}
                <button
                  onClick={() => window.location.reload()}
                  className="btn-retry"
                >
                  <i className="fas fa-sync-alt"></i> Reintentar
                </button>
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Doctor</th>
                      <th>Fecha</th>
                      <th>Hora Inicio</th>
                      <th>Hora Fin</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.filter(
                      (cita) => !filtroEstado || cita.estado === filtroEstado
                    ).length === 0 ? (
                      <tr>
                        <td colSpan="7" className="no-data">
                          <i className="fas fa-calendar-check"></i> No se
                          encontraron citas
                        </td>
                      </tr>
                    ) : (
                      citas
                        .filter(
                          (cita) =>
                            !filtroEstado || cita.estado === filtroEstado
                        )
                        .map((cita) => (
                          <tr key={cita.idCita}>
                            <td>
                              <div className="doctor-name">
                                {cita.paciente.primerNombre}{" "}
                                {cita.paciente.primerApellido}
                              </div>
                              <div className="doctor-subtext">
                                {cita.paciente.segundoNombre}{" "}
                                {cita.paciente.segundoApellido}
                              </div>
                              <div className="doctor-document">
                                {cita.paciente.tipoDocumento}:{" "}
                                {cita.paciente.numeroDocumento}
                              </div>
                            </td>
                            <td>
                              <div className="doctor-name">
                                {cita.doctor.primerNombre}{" "}
                                {cita.doctor.primerApellido}
                              </div>
                              <div className="doctor-subtext">
                                {cita.doctor.segundoNombre}{" "}
                                {cita.doctor.segundoApellido}
                              </div>
                              <div className="doctor-document">
                                {cita.doctor.tipoDocumento}:{" "}
                                {cita.doctor.numeroDocumento}
                              </div>
                            </td>
                            <td>{cita.fecha}</td>
                            <td>{cita.horaInicio}</td>
                            <td>{cita.horaFin}</td>
                            <td>
                              <span className="specialty-badge">
                                {cita.estado}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="btn-action view-btn"
                                  title="Ver cita"
                                  onClick={() => abrirModalVer(cita)}
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button
                                  className="btn-action confirm-btn"
                                  title="Confirmar cita"
                                  onClick={() => confirmarCita(cita.idCita)}
                                  disabled={confirmarLoading}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  className="btn-action delete-btn"
                                  title="Cancelar cita"
                                  onClick={() => cancelarCita(cita.idCita)}
                                  disabled={confirmarLoading}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Notificaciones */}
          {successMensaje && (
            <div className="notification success">
              <i className="fas fa-check-circle"></i> {successMensaje}
            </div>
          )}
          {error && !loading && (
            <div className="notification error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          {/* Modal de visualización de cita */}
          {modalVerOpen && citaSeleccionada && (
            <div className="modal-overlay" onClick={cerrarModalVer}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={cerrarModalVer}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="modal-header">
                  <i className="fas fa-calendar-check modal-icon"></i>
                  <div>
                    <h3>Cita #{citaSeleccionada.idCita}</h3>
                    <p className="doctor-specialty">
                      Estado:{" "}
                      <span className="specialty-badge">
                        {citaSeleccionada.estado}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="modal-grid">
                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-user"></i> Paciente
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Nombre completo:</span>
                      <span className="info-value">
                        {citaSeleccionada.paciente.primerNombre}{" "}
                        {citaSeleccionada.paciente.segundoNombre}{" "}
                        {citaSeleccionada.paciente.primerApellido}{" "}
                        {citaSeleccionada.paciente.segundoApellido}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Documento:</span>
                      <span className="info-value">
                        {citaSeleccionada.paciente.tipoDocumento}:{" "}
                        {citaSeleccionada.paciente.numeroDocumento}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">
                        {citaSeleccionada.paciente.telefono}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">
                        {citaSeleccionada.paciente.email}
                      </span>
                    </div>
                  </div>
                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-user-md"></i> Doctor
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Nombre completo:</span>
                      <span className="info-value">
                        {citaSeleccionada.doctor.primerNombre}{" "}
                        {citaSeleccionada.doctor.segundoNombre}{" "}
                        {citaSeleccionada.doctor.primerApellido}{" "}
                        {citaSeleccionada.doctor.segundoApellido}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Especialidad:</span>
                      <span className="info-value">
                        {citaSeleccionada.doctor.especialidad}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">
                        {citaSeleccionada.doctor.telefono}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">
                        {citaSeleccionada.doctor.email}
                      </span>
                    </div>
                  </div>
                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-calendar-day"></i> Detalles de la
                      Cita
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Fecha:</span>
                      <span className="info-value">
                        {citaSeleccionada.fecha}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Hora Inicio:</span>
                      <span className="info-value">
                        {citaSeleccionada.horaInicio}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Hora Fin:</span>
                      <span className="info-value">
                        {citaSeleccionada.horaFin}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={cerrarModalVer}>
                    <i className="fas fa-times"></i> Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* The modal for registering a new appointment is removed */}
        </main>
      </div>
    </div>
  );
}

export default Citas;
