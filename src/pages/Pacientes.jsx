import { useEffect, useState } from "react";
import "../styles/Pacientes.css";

function Pacientes() {
  // Estados (se mantienen igual)
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [form, setForm] = useState({
    /* ... */
  });
  const [registroLoading, setRegistroLoading] = useState(false);
  const [registroMensaje, setRegistroMensaje] = useState("");
  const [registroError, setRegistroError] = useState("");
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [formEditar, setFormEditar] = useState({
    /* ... */
  });
  const [editarLoading, setEditarLoading] = useState(false);
  const [editarMensaje, setEditarMensaje] = useState("");
  const [editarError, setEditarError] = useState("");
  const [eliminarLoading, setEliminarLoading] = useState(false);
  const [eliminarMensaje, setEliminarMensaje] = useState("");
  const [eliminarError, setEliminarError] = useState("");

  // Efectos y funciones handlers (se mantienen igual)
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch(
          "https://aplicacion-jfw5.onrender.com/api/v1/paciente"
        );
        if (!response.ok) throw new Error("Error en la respuesta");
        const data = await response.json();
        setPacientes(data.pacientes || []);
      } catch (err) {
        setError("Error al cargar los pacientes");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPacientes();
  }, []);

  const filteredPacientes = pacientes.filter((paciente) =>
    `${paciente.primerNombre} ${paciente.primerApellido} ${paciente.numeroDocumento} ${paciente.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal de registro
  const abrirModalRegistro = () => {
    setForm({
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      tipoDocumento: "CC",
      numeroDocumento: "",
      fechaNacimiento: "",
      sexo: "M",
      direccion: "",
      telefono: "",
      email: "",
    });
    setRegistroMensaje("");
    setRegistroError("");
    setModalRegistroOpen(true);
  };

  const cerrarModalRegistro = () => {
    setModalRegistroOpen(false);
  };

  // Función para abrir el modal de ver detalles
  const abrirModal = (paciente) => {
    setPacienteSeleccionado(paciente);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setPacienteSeleccionado(null);
  };

  // Función para abrir el modal de edición
  const abrirModalEditar = (paciente) => {
    setFormEditar({
      idPaciente: paciente.idPaciente,
      primerNombre: paciente.primerNombre || "",
      segundoNombre: paciente.segundoNombre || "",
      primerApellido: paciente.primerApellido || "",
      segundoApellido: paciente.segundoApellido || "",
      tipoDocumento: paciente.tipoDocumento || "CC",
      numeroDocumento: paciente.numeroDocumento || "",
      fechaNacimiento: paciente.fechaNacimiento
        ? paciente.fechaNacimiento.split("T")[0]
        : "",
      sexo: paciente.sexo || "M",
      direccion: paciente.direccion || "",
      telefono: paciente.telefono || "",
      email: paciente.email || "",
    });
    setEditarMensaje("");
    setEditarError("");
    setModalEditarOpen(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarOpen(false);
  };

  // Handlers para formularios
  const handleRegistroChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditarChange = (e) => {
    setFormEditar({ ...formEditar, [e.target.name]: e.target.value });
  };

  // Submit registro
  const handleRegistroSubmit = async (e) => {
    e.preventDefault();
    setRegistroLoading(true);
    setRegistroMensaje("");
    setRegistroError("");
    try {
      const res = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/paciente",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al registrar paciente");
      setRegistroMensaje("Paciente registrado exitosamente");
      setForm({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        tipoDocumento: "CC",
        numeroDocumento: "",
        fechaNacimiento: "",
        sexo: "M",
        direccion: "",
        telefono: "",
        email: "",
      });
      setLoading(true);
      const response = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/paciente"
      );
      const data = await response.json();
      setPacientes(data.pacientes || []);
      setLoading(false);
      setTimeout(() => {
        setModalRegistroOpen(false);
      }, 1200);
    } catch {
      setRegistroError("No se pudo registrar el paciente");
    } finally {
      setRegistroLoading(false);
    }
  };

  // Submit edición
  const handleEditarSubmit = async (e) => {
    e.preventDefault();
    setEditarLoading(true);
    setEditarMensaje("");
    setEditarError("");
    try {
      const res = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/paciente",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formEditar),
        }
      );
      if (!res.ok) throw new Error("Error al editar paciente");
      setEditarMensaje("Paciente editado exitosamente");
      setLoading(true);
      const response = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/paciente"
      );
      const data = await response.json();
      setPacientes(data.pacientes || []);
      setLoading(false);
      setTimeout(() => {
        setModalEditarOpen(false);
      }, 1200);
    } catch {
      setEditarError("No se pudo editar el paciente");
    } finally {
      setEditarLoading(false);
    }
  };

  // Función para eliminar paciente
  const handleEliminarPaciente = async (paciente) => {
    setEliminarLoading(true);
    setEliminarMensaje("");
    setEliminarError("");
    try {
      const res = await fetch(
        `https://aplicacion-jfw5.onrender.com/api/v1/paciente/${paciente.idPaciente}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Error al eliminar paciente");
      setEliminarMensaje("Paciente eliminado exitosamente");
      setLoading(true);
      const response = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/paciente"
      );
      const data = await response.json();
      setPacientes(data.pacientes || []);
      setLoading(false);
      setTimeout(() => {
        setModalEditarOpen(false);
      }, 1200);
    } catch {
      setEliminarError("No se pudo eliminar el paciente");
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
              <i className="fas fa-user-injured"></i> Gestión de Pacientes
            </h1>
            <p>Administración de registros médicos de pacientes</p>
          </div>

          <section className="card-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-list"></i> Listado de Pacientes
              </h2>
              <div className="section-actions">
                <div className="search-container">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Buscar pacientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button className="btn-primary" onClick={abrirModalRegistro}>
                  <i className="fas fa-plus"></i> Nuevo Paciente
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin"></i> Cargando pacientes...
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
                      <th>Sexo</th>
                      <th>Edad</th>
                      <th>Contacto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPacientes.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="no-data">
                          <i className="fas fa-user-slash"></i> No se
                          encontraron pacientes
                        </td>
                      </tr>
                    ) : (
                      filteredPacientes.map((paciente) => {
                        const edad = paciente.fechaNacimiento
                          ? new Date().getFullYear() -
                            new Date(paciente.fechaNacimiento).getFullYear()
                          : "N/A";

                        return (
                          <tr key={paciente.idPaciente}>
                            <td>
                              <div className="patient-name">
                                {paciente.primerNombre}{" "}
                                {paciente.primerApellido}
                              </div>
                              <div className="patient-subtext">
                                {paciente.segundoNombre}{" "}
                                {paciente.segundoApellido}
                              </div>
                            </td>
                            <td>
                              <div className="patient-document">
                                {paciente.tipoDocumento}:{" "}
                                {paciente.numeroDocumento}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`sex-badge ${paciente.sexo?.toLowerCase()}`}
                              >
                                {paciente.sexo === "M"
                                  ? "Masculino"
                                  : "Femenino"}
                              </span>
                            </td>
                            <td>{edad} años</td>
                            <td>
                              <div className="patient-contact">
                                {paciente.telefono && (
                                  <div>
                                    <i className="fas fa-phone"></i>{" "}
                                    {paciente.telefono}
                                  </div>
                                )}
                                {paciente.email && (
                                  <div>
                                    <i className="fas fa-envelope"></i>{" "}
                                    {paciente.email}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="btn-action view-btn"
                                  onClick={() => abrirModal(paciente)}
                                  title="Ver detalles"
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button
                                  className="btn-action edit-btn"
                                  onClick={() => abrirModalEditar(paciente)}
                                  title="Editar"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn-action delete-btn"
                                  onClick={() =>
                                    handleEliminarPaciente(paciente)
                                  }
                                  disabled={eliminarLoading}
                                  title="Eliminar"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Modal de visualización */}
          {modalOpen && pacienteSeleccionado && (
            <div className="modal-overlay" onClick={cerrarModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={cerrarModal}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="modal-header">
                  <i className="fas fa-user-injured modal-icon"></i>
                  <div>
                    <h3>
                      {pacienteSeleccionado.primerNombre}{" "}
                      {pacienteSeleccionado.primerApellido}
                    </h3>
                    <p className="patient-id">
                      ID: {pacienteSeleccionado.idPaciente}
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
                        {pacienteSeleccionado.primerNombre}{" "}
                        {pacienteSeleccionado.segundoNombre || ""}
                        {pacienteSeleccionado.primerApellido}{" "}
                        {pacienteSeleccionado.segundoApellido || ""}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Documento:</span>
                      <span className="info-value">
                        {pacienteSeleccionado.tipoDocumento}:{" "}
                        {pacienteSeleccionado.numeroDocumento}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fecha de nacimiento:</span>
                      <span className="info-value">
                        {pacienteSeleccionado.fechaNacimiento?.split("T")[0]} (
                        {new Date().getFullYear() -
                          new Date(
                            pacienteSeleccionado.fechaNacimiento
                          ).getFullYear()}{" "}
                        años)
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Sexo:</span>
                      <span className="info-value">
                        <span
                          className={`sex-badge ${pacienteSeleccionado.sexo?.toLowerCase()}`}
                        >
                          {pacienteSeleccionado.sexo === "M"
                            ? "Masculino"
                            : "Femenino"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-address-book"></i> Contacto
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">
                        {pacienteSeleccionado.direccion || "N/A"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">
                        {pacienteSeleccionado.telefono || "N/A"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">
                        {pacienteSeleccionado.email || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary" onClick={cerrarModal}>
                    <i className="fas fa-times"></i> Cerrar
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      cerrarModal();
                      abrirModalEditar(pacienteSeleccionado);
                    }}
                  >
                    <i className="fas fa-edit"></i> Editar Paciente
                  </button>
                </div>
              </div>
            </div>
          )}

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
                  <h3>Registrar Nuevo Paciente</h3>
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
                        <i className="fas fa-birthday-cake"></i> Fecha
                        Nacimiento*
                      </label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={form.fechaNacimiento}
                        onChange={handleRegistroChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-venus-mars"></i> Sexo*
                      </label>
                      <select
                        name="sexo"
                        value={form.sexo}
                        onChange={handleRegistroChange}
                        className="form-input"
                        required
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
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
                          <i className="fas fa-save"></i> Registrar Paciente
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
                  <h3>Editar Paciente</h3>
                </div>

                <form className="form-modal" onSubmit={handleEditarSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <i className="fas fa-id-card"></i> Primer Nombre*
                      </label>
                      <input
                        name="primerNombre"
                        value={formEditar.primerNombre}
                        onChange={handleEditarChange}
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
                        value={formEditar.segundoNombre}
                        onChange={handleEditarChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-id-card"></i> Primer Apellido*
                      </label>
                      <input
                        name="primerApellido"
                        value={formEditar.primerApellido}
                        onChange={handleEditarChange}
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
                        value={formEditar.segundoApellido}
                        onChange={handleEditarChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-address-card"></i> Tipo Documento*
                      </label>
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
                      <label>
                        <i className="fas fa-hashtag"></i> Número Documento*
                      </label>
                      <input
                        name="numeroDocumento"
                        value={formEditar.numeroDocumento}
                        onChange={handleEditarChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-birthday-cake"></i> Fecha
                        Nacimiento*
                      </label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formEditar.fechaNacimiento}
                        onChange={handleEditarChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-venus-mars"></i> Sexo*
                      </label>
                      <select
                        name="sexo"
                        value={formEditar.sexo}
                        onChange={handleEditarChange}
                        className="form-input"
                        required
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-map-marker-alt"></i> Dirección
                      </label>
                      <input
                        name="direccion"
                        value={formEditar.direccion}
                        onChange={handleEditarChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-phone"></i> Teléfono
                      </label>
                      <input
                        name="telefono"
                        value={formEditar.telefono}
                        onChange={handleEditarChange}
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
                        value={formEditar.email}
                        onChange={handleEditarChange}
                        className="form-input"
                      />
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

export default Pacientes;
