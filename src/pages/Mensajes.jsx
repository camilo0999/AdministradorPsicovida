import React, { useState, useEffect } from "react";
import { mensajeService } from "../services/mensajeService";
import "../styles/Mensajes.css";

function Mensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await mensajeService.obtenerMensajes();
      setMensajes(response.mensajes || []);
    } catch (err) {
      setError("Error al cargar los mensajes. Por favor, inténtalo de nuevo.");
      console.error("Error cargando mensajes:", err);
    } finally {
      setLoading(false);
    }
  };

  const marcarComoVisto = async (id) => {
    try {
      await mensajeService.marcarComoVisto(id);
      // Actualizar el estado local del mensaje
      setMensajes((prevMensajes) =>
        prevMensajes.map((mensaje) =>
          mensaje.id === id ? { ...mensaje, visto: true } : mensaje
        )
      );
    } catch (err) {
      console.error("Error marcando mensaje como visto:", err);
    }
  };

  const abrirModal = (mensaje) => {
    setMensajeSeleccionado(mensaje);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMensajeSeleccionado(null);
  };

  const formatearFecha = (fecha, hora) => {
    const fechaObj = new Date(`${fecha}T${hora}`);
    return fechaObj.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mensajes-container">
      <div className="mensajes-header">
        <h1 className="page-title">Mensajes Recibidos</h1>
        <div className="mensajes-stats">
          <div className="stat-card total">
            <span className="stat-number">{mensajes.length}</span>
            <span className="stat-label">Total Mensajes</span>
          </div>
          <div className="stat-card no-vistos">
            <span className="stat-number">
              {mensajes.filter((m) => !m.visto).length}
            </span>
            <span className="stat-label">No Vistos</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando mensajes...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">!</div>
          <p>{error}</p>
          <button className="retry-btn" onClick={cargarMensajes}>
            Reintentar
          </button>
        </div>
      ) : mensajes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No hay mensajes</h3>
          <p>Cuando recibas nuevos mensajes, aparecerán aquí.</p>
        </div>
      ) : (
        <div className="mensajes-table-container">
          <table className="mensajes-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Asunto</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.map((mensaje) => (
                <tr
                  key={mensaje.id}
                  className={!mensaje.visto ? "no-visto" : ""}
                >
                  <td className="nombre-cell">
                    <strong>{mensaje.nombreCompleto}</strong>
                  </td>
                  <td className="asunto-cell">{mensaje.asunto}</td>
                  <td className="estado-cell">
                    <span
                      className={`estado-badge ${
                        mensaje.visto ? "visto" : "no-visto"
                      }`}
                    >
                      {mensaje.visto ? "Visto" : "Nuevo"}
                    </span>
                  </td>
                  <td className="fecha-cell">
                    {formatearFecha(mensaje.fecha, mensaje.hora)}
                  </td>
                  <td className="acciones-cell">
                    <button
                      className="btn-ver btn-primary"
                      onClick={() => abrirModal(mensaje)}
                    >
                      Ver Detalles
                    </button>
                    {!mensaje.visto && (
                      <button
                        className="btn-marcar btn-success"
                        onClick={() => marcarComoVisto(mensaje.id)}
                      >
                        Marcar Leído
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para mostrar detalles del mensaje */}
      {modalAbierto && mensajeSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Mensaje</h2>
              <button className="modal-close" onClick={cerrarModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="mensaje-detalle">
                <div className="detalle-item">
                  <label>Nombre:</label>
                  <span>{mensajeSeleccionado.nombreCompleto}</span>
                </div>
                <div className="detalle-item">
                  <label>Email:</label>
                  <span>{mensajeSeleccionado.email}</span>
                </div>
                <div className="detalle-item">
                  <label>Teléfono:</label>
                  <span>{mensajeSeleccionado.telefono}</span>
                </div>
                <div className="detalle-item">
                  <label>Asunto:</label>
                  <span>{mensajeSeleccionado.asunto}</span>
                </div>
                <div className="detalle-item">
                  <label>Fecha:</label>
                  <span>
                    {formatearFecha(
                      mensajeSeleccionado.fecha,
                      mensajeSeleccionado.hora
                    )}
                  </span>
                </div>
                <div className="detalle-item mensaje-texto">
                  <label>Mensaje:</label>
                  <p>{mensajeSeleccionado.mensaje}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {!mensajeSeleccionado.visto && (
                <button
                  className="btn-marcar btn-success"
                  onClick={() => {
                    marcarComoVisto(mensajeSeleccionado.id);
                    cerrarModal();
                  }}
                >
                  Marcar Como Leído
                </button>
              )}
              <button
                className="btn-cerrar btn-secondary"
                onClick={cerrarModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mensajes;
