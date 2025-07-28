import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Doctores.css";

function Doctores() {
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [form, setForm] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    numeroDocumento: "",
    tipoDocumento: "CC",
    especialidad: "",
    email: "",
    telefono: "",
    direccion: "",
    descripcion: "",
  });
  const [registroLoading, setRegistroLoading] = useState(false);
  const [registroMensaje, setRegistroMensaje] = useState("");
  const [registroError, setRegistroError] = useState("");
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [formEditar, setFormEditar] = useState({
    idDoctor: null,
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    numeroDocumento: "",
    tipoDocumento: "CC",
    especialidad: "",
    email: "",
    telefono: "",
    direccion: "",
    descripcion: "",
  });
  const [editarLoading, setEditarLoading] = useState(false);
  const [editarMensaje, setEditarMensaje] = useState("");
  const [editarError, setEditarError] = useState("");
  const [eliminarLoading, setEliminarLoading] = useState(false);
  const [eliminarMensaje, setEliminarMensaje] = useState("");
  const [eliminarError, setEliminarError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = await fetch(
          "https://aplicacion-jfw5.onrender.com/api/v1/doctor"
        );
        if (!response.ok) throw new Error("Error en la respuesta");
        const data = await response.json();
        setDoctores(data.doctores || data || []);
      } catch (err) {
        setError("Error al cargar los doctores");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctores();
  }, []);

  const filteredDoctores = doctores.filter((doctor) =>
    `${doctor.primerNombre} ${doctor.primerApellido} ${doctor.numeroDocumento} ${doctor.especialidad}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal de registro de doctor
  const abrirModalRegistro = () => {
    setForm({
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      numeroDocumento: "",
      tipoDocumento: "CC",
      especialidad: "",
      email: "",
      telefono: "",
      direccion: "",
      descripcion: "",
    });
    setRegistroMensaje("");
    setRegistroError("");
    setModalRegistroOpen(true);
  };

  const cerrarModalRegistro = () => {
    setModalRegistroOpen(false);
  };

  // Función para abrir el modal de ver detalles de doctor
  const abrirModalVer = (doctor) => {
    setDoctorSeleccionado(doctor);
    setModalVerOpen(true);
  };

  const cerrarModalVer = () => {
    setModalVerOpen(false);
    setDoctorSeleccionado(null);
  };

  // Función para abrir el modal de editar doctor
  const abrirModalEditar = (doctor) => {
    setFormEditar({
      idDoctor: doctor.idDoctor,
      primerNombre: doctor.primerNombre || "",
      segundoNombre: doctor.segundoNombre || "",
      primerApellido: doctor.primerApellido || "",
      segundoApellido: doctor.segundoApellido || "",
      numeroDocumento: doctor.numeroDocumento || "",
      tipoDocumento: doctor.tipoDocumento || "CC",
      especialidad: doctor.especialidad || "",
      email: doctor.email || "",
      telefono: doctor.telefono || "",
      direccion: doctor.direccion || "",
      descripcion: doctor.descripcion || "",
    });
    setEditarMensaje("");
    setEditarError("");
    setModalEditarOpen(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarOpen(false);
  };

  // Función para manejar el submit del formulario de registro
  const handleRegistroChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegistroSubmit = async (e) => {
    e.preventDefault();
    setRegistroLoading(true);
    setRegistroMensaje("");
    setRegistroError("");
    try {
      const res = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/doctor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al registrar doctor");
      setRegistroMensaje("Doctor registrado exitosamente");
      setForm({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        numeroDocumento: "",
        tipoDocumento: "CC",
        especialidad: "",
        email: "",
        telefono: "",
        direccion: "",
        descripcion: "",
      });
      setLoading(true);
      const response = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/doctor"
      );
      const data = await response.json();
      setDoctores(data.doctores || data || []);
      setLoading(false);
      setTimeout(() => {
        setModalRegistroOpen(false);
      }, 1200);
    } catch {
      setRegistroError("No se pudo registrar el doctor");
    } finally {
      setRegistroLoading(false);
    }
  };

  // Función para manejar el cambio en el formulario de edición
  const handleEditarChange = (e) => {
    setFormEditar({ ...formEditar, [e.target.name]: e.target.value });
  };

  // Función para manejar el submit del formulario de edición
  const handleEditarSubmit = async (e) => {
    e.preventDefault();
    setEditarLoading(true);
    setEditarMensaje("");
    setEditarError("");
    try {
      const res = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/doctor",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formEditar),
        }
      );
      if (!res.ok) throw new Error("Error al editar doctor");
      setEditarMensaje("Doctor editado exitosamente");
      // Recargar la lista de doctores
      setLoading(true);
      const response = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/doctor"
      );
      const data = await response.json();
      setDoctores(data.doctores || data || []);
      setLoading(false);
      setTimeout(() => {
        setModalEditarOpen(false);
      }, 1200);
    } catch {
      setEditarError("No se pudo editar el doctor");
    } finally {
      setEditarLoading(false);
    }
  };

  // Función para manejar la eliminación de un doctor
  const handleEliminarDoctor = async (doctor) => {
    setEliminarLoading(true);
    setEliminarMensaje("");
    setEliminarError("");
    try {
      const res = await fetch(
        `https://aplicacion-jfw5.onrender.com/api/v1/doctor/${doctor.idDoctor}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Error al eliminar doctor");
      setEliminarMensaje("Doctor eliminado exitosamente");
      setLoading(true);
      const response = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/doctor"
      );
      const data = await response.json();
      setDoctores(data.doctores || data || []);
      setLoading(false);
      setTimeout(() => {
        setModalEditarOpen(false); // Cerrar el modal de edición si se elimina
      }, 1200);
    } catch {
      setEliminarError("No se pudo eliminar el doctor");
    } finally {
      setEliminarLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <main className="main-content">
          <div className="content-header">
            <h1>
              <i className="fas fa-user-md"></i> Gestión de Psicologos
            </h1>
            <p>Administración del personal de salud mental </p>
          </div>

          <section className="card-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-list"></i> Listado de Psicologos
              </h2>
              <div className="section-actions">
                <div className="search-container">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Buscar doctores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button className="btn-primary" onClick={abrirModalRegistro}>
                  <i className="fas fa-plus"></i> Nuevo Doctor
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin"></i> Cargando doctores...
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
                      <th>Nombre</th>
                      <th>Documento</th>
                      <th>Especialidad</th>
                      <th>Contacto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctores.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="no-data">
                          <i className="fas fa-user-md"></i> No se encontraron
                          doctores
                        </td>
                      </tr>
                    ) : (
                      filteredDoctores.map((doctor) => (
                        <tr key={doctor.idDoctor}>
                          <td>
                            <div className="doctor-name">
                              {doctor.primerNombre} {doctor.primerApellido}
                            </div>
                            <div className="doctor-subtext">
                              {doctor.segundoNombre} {doctor.segundoApellido}
                            </div>
                          </td>
                          <td>
                            <div className="doctor-document">
                              {doctor.tipoDocumento}: {doctor.numeroDocumento}
                            </div>
                          </td>
                          <td>
                            <span className="specialty-badge">
                              {doctor.especialidad || "General"}
                            </span>
                          </td>
                          <td>
                            <div className="doctor-contact">
                              {doctor.telefono && (
                                <div>
                                  <i className="fas fa-phone"></i>{" "}
                                  {doctor.telefono}
                                </div>
                              )}
                              {doctor.email && (
                                <div>
                                  <i className="fas fa-envelope"></i>{" "}
                                  {doctor.email}
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-action view-btn"
                                onClick={() => abrirModalVer(doctor)}
                                title="Ver detalles"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                className="btn-action edit-btn"
                                onClick={() => abrirModalEditar(doctor)}
                                title="Editar"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn-action delete-btn"
                                onClick={() => handleEliminarDoctor(doctor)}
                                disabled={eliminarLoading}
                                title="Eliminar"
                              >
                                <i className="fas fa-trash"></i>
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

          {/* Modal de registro */}
          {modalRegistroOpen && (
            <div className="modal-overlay" onClick={cerrarModalRegistro}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={cerrarModalRegistro}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="modal-header">
                  <i className="fas fa-user-plus modal-icon"></i>
                  <h3>Registrar Nuevo Doctor</h3>
                </div>

                <form className="form-modal" onSubmit={handleRegistroSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <i className="fas fa-id-card"></i> Primer Nombre*
                      </label>
                      <input
                        name="primerNombre"
                        value={form.primerNombre}
                        onChange={handleRegistroChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-id-card"></i> Segundo Nombre
                      </label>
                      <input
                        name="segundoNombre"
                        value={form.segundoNombre}
                        onChange={handleRegistroChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-id-card"></i> Primer Apellido*
                      </label>
                      <input
                        name="primerApellido"
                        value={form.primerApellido}
                        onChange={handleRegistroChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-id-card"></i> Segundo Apellido
                      </label>
                      <input
                        name="segundoApellido"
                        value={form.segundoApellido}
                        onChange={handleRegistroChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-address-card"></i> Tipo Documento*
                      </label>
                      <select
                        name="tipoDocumento"
                        value={form.tipoDocumento}
                        onChange={handleRegistroChange}
                        className="form-input"
                        required
                      >
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="TI">Tarjeta de Identidad</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-hashtag"></i> Número Documento*
                      </label>
                      <input
                        name="numeroDocumento"
                        value={form.numeroDocumento}
                        onChange={handleRegistroChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-stethoscope"></i> Especialidad*
                      </label>
                      <input
                        name="especialidad"
                        value={form.especialidad}
                        onChange={handleRegistroChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-envelope"></i> Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleRegistroChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-phone"></i> Teléfono
                      </label>
                      <input
                        name="telefono"
                        value={form.telefono}
                        onChange={handleRegistroChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-map-marker-alt"></i> Dirección
                      </label>
                      <input
                        name="direccion"
                        value={form.direccion}
                        onChange={handleRegistroChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>
                        <i className="fas fa-file-alt"></i> Descripción
                      </label>
                      <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleRegistroChange}
                        className="form-textarea"
                        rows="3"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={cerrarModalRegistro}
                    >
                      <i className="fas fa-times"></i> Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={registroLoading}
                    >
                      {registroLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>{" "}
                          Registrando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save"></i> Registrar Doctor
                        </>
                      )}
                    </button>
                  </div>

                  {registroMensaje && (
                    <div className="success-state">
                      <i className="fas fa-check-circle"></i> {registroMensaje}
                    </div>
                  )}

                  {registroError && (
                    <div className="error-state">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {registroError}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Modal de visualización */}
          {modalVerOpen && doctorSeleccionado && (
            <div className="modal-overlay" onClick={cerrarModalVer}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={cerrarModalVer}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="modal-header">
                  <i className="fas fa-user-md modal-icon"></i>
                  <div>
                    <h3>
                      {doctorSeleccionado.primerNombre}{" "}
                      {doctorSeleccionado.primerApellido}
                    </h3>
                    <p className="doctor-specialty">
                      <i className="fas fa-stethoscope"></i>{" "}
                      {doctorSeleccionado.especialidad || "Médico General"}
                    </p>
                  </div>
                </div>

                <div className="modal-grid">
                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-id-card"></i> Información Personal
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Nombre completo:</span>
                      <span className="info-value">
                        {doctorSeleccionado.primerNombre}{" "}
                        {doctorSeleccionado.segundoNombre || ""}{" "}
                        {doctorSeleccionado.primerApellido}{" "}
                        {doctorSeleccionado.segundoApellido || ""}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Documento:</span>
                      <span className="info-value">
                        <i className="fas fa-id-badge"></i>{" "}
                        {doctorSeleccionado.tipoDocumento}:{" "}
                        {doctorSeleccionado.numeroDocumento}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">ID Doctor:</span>
                      <span className="info-value">
                        {doctorSeleccionado.idDoctor}
                      </span>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-user-graduate"></i> Información
                      Profesional
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Especialidad:</span>
                      <span className="info-value">
                        {doctorSeleccionado.especialidad || "No especificada"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Descripción:</span>
                      <span className="info-value">
                        {doctorSeleccionado.descripcion || "No disponible"}
                      </span>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-address-book"></i> Contacto
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">
                        <i className="fas fa-phone"></i>{" "}
                        {doctorSeleccionado.telefono || "No disponible"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">
                        <i className="fas fa-envelope"></i>{" "}
                        {doctorSeleccionado.email || "No disponible"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {doctorSeleccionado.direccion || "No disponible"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary" onClick={cerrarModalVer}>
                    <i className="fas fa-times"></i> Cerrar
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      cerrarModalVer();
                      abrirModalEditar(doctorSeleccionado);
                    }}
                  >
                    <i className="fas fa-edit"></i> Editar Doctor
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de edición */}
          {modalEditarOpen && (
            <div className="modal-overlay" onClick={cerrarModalEditar}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={cerrarModalEditar}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="modal-header">
                  <i className="fas fa-user-edit modal-icon"></i>
                  <h3>Editar Doctor</h3>
                </div>
                <form className="form-modal" onSubmit={handleEditarSubmit}>
                  <div className="modal-grid">
                    <div className="modal-section">
                      <h4>
                        <i className="fas fa-id-card"></i> Información Personal
                      </h4>
                      <div className="form-group">
                        <label>Primer Nombre*</label>
                        <input
                          name="primerNombre"
                          value={formEditar.primerNombre}
                          onChange={handleEditarChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Segundo Nombre</label>
                        <input
                          name="segundoNombre"
                          value={formEditar.segundoNombre}
                          onChange={handleEditarChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Primer Apellido*</label>
                        <input
                          name="primerApellido"
                          value={formEditar.primerApellido}
                          onChange={handleEditarChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Segundo Apellido</label>
                        <input
                          name="segundoApellido"
                          value={formEditar.segundoApellido}
                          onChange={handleEditarChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Tipo Documento*</label>
                        <select
                          name="tipoDocumento"
                          value={formEditar.tipoDocumento}
                          onChange={handleEditarChange}
                          className="form-input"
                          required
                        >
                          <option value="CC">Cédula de Ciudadanía</option>
                          <option value="CE">Cédula de Extranjería</option>
                          <option value="TI">Tarjeta de Identidad</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Número Documento*</label>
                        <input
                          name="numeroDocumento"
                          value={formEditar.numeroDocumento}
                          onChange={handleEditarChange}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="modal-section">
                      <h4>
                        <i className="fas fa-user-graduate"></i> Información
                        Profesional
                      </h4>
                      <div className="form-group">
                        <label>Especialidad*</label>
                        <input
                          name="especialidad"
                          value={formEditar.especialidad}
                          onChange={handleEditarChange}
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                          name="descripcion"
                          value={formEditar.descripcion}
                          onChange={handleEditarChange}
                          className="form-textarea"
                          rows="3"
                        />
                      </div>
                    </div>
                    <div className="modal-section">
                      <h4>
                        <i className="fas fa-address-book"></i> Contacto
                      </h4>
                      <div className="form-group">
                        <label>Teléfono</label>
                        <input
                          name="telefono"
                          value={formEditar.telefono}
                          onChange={handleEditarChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formEditar.email}
                          onChange={handleEditarChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Dirección</label>
                        <input
                          name="direccion"
                          value={formEditar.direccion}
                          onChange={handleEditarChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={cerrarModalEditar}
                    >
                      <i className="fas fa-times"></i> Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={editarLoading}
                    >
                      {editarLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>{" "}
                          Guardando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save"></i> Guardar Cambios
                        </>
                      )}
                    </button>
                  </div>
                  {editarMensaje && (
                    <div className="success-state">
                      <i className="fas fa-check-circle"></i> {editarMensaje}
                    </div>
                  )}
                  {editarError && (
                    <div className="error-state">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {editarError}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Notificaciones */}
          {registroMensaje && (
            <div className="notification success">
              <i className="fas fa-check-circle"></i> {registroMensaje}
            </div>
          )}

          {registroError && (
            <div className="notification error">
              <i className="fas fa-exclamation-circle"></i> {registroError}
            </div>
          )}

          {eliminarMensaje && (
            <div className="notification success">
              <i className="fas fa-check-circle"></i> {eliminarMensaje}
            </div>
          )}

          {eliminarError && (
            <div className="notification error">
              <i className="fas fa-exclamation-circle"></i> {eliminarError}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Doctores;
