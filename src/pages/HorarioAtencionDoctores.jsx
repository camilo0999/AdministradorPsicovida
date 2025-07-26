import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import "../styles/HorarioAtencion.css";

function HorarioAtencionDoctores() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    idDoctor: "",
    diaSemana: "LUNES",
    horaInicio: "08:00",
    horaFin: "16:00",
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [doctores, setDoctores] = useState([]);
  const [loadingDoctores, setLoadingDoctores] = useState(false);
  const [errorDoctores, setErrorDoctores] = useState("");

  // Para ver horarios
  const [modalHorariosOpen, setModalHorariosOpen] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [errorHorarios, setErrorHorarios] = useState("");
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);

  useEffect(() => {
    cargarDoctores();
  }, []);

  const cargarDoctores = async () => {
    setLoadingDoctores(true);
    setErrorDoctores("");
    try {
      const response = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/doctor"
      );
      if (!response.ok) throw new Error("Error al cargar doctores");
      const data = await response.json();
      setDoctores(Array.isArray(data.doctores) ? data.doctores : []);
    } catch (err) {
      setErrorDoctores("No se pudieron cargar los doctores");
      console.error("Error:", err);
    } finally {
      setLoadingDoctores(false);
    }
  };

  const abrirModal = () => {
    setForm({
      idDoctor: "",
      diaSemana: "LUNES",
      horaInicio: "08:00",
      horaFin: "16:00",
    });
    setMensaje("");
    setError("");
    setModalOpen(true);
  };

  const cerrarModal = () => setModalOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setError("");

    try {
      const res = await fetch(
        "https://aplicacion-jfw5.onrender.com/api/v1/horario-atencion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctor: { idDoctor: Number(form.idDoctor) },
            diaSemana: form.diaSemana,
            horaInicio: `${form.horaInicio}:00`,
            horaFin: `${form.horaFin}:00`,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al registrar horario");

      setMensaje("Horario registrado exitosamente");
      setTimeout(() => {
        setModalOpen(false);
        cargarDoctores();
      }, 1200);
    } catch (err) {
      setError("No se pudo registrar el horario");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const verHorariosDoctor = async (doctor) => {
    setDoctorSeleccionado(doctor);
    setModalHorariosOpen(true);
    setLoadingHorarios(true);
    setErrorHorarios("");

    try {
      const response = await fetch(
        `https://aplicacion-jfw5.onrender.com/api/v1/horario-atencion/doctor/${doctor.idDoctor}`
      );
      if (!response.ok) throw new Error("Error al cargar horarios");
      const data = await response.json();
      setHorarios(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorHorarios("No se pudieron cargar los horarios");
      console.error("Error:", err);
    } finally {
      setLoadingHorarios(false);
    }
  };

  const cerrarModalHorarios = () => {
    setModalHorariosOpen(false);
    setHorarios([]);
    setDoctorSeleccionado(null);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <main className="main-content">
          <div className="content-header">
            <h1>
              <i className="fas fa-calendar-alt"></i> Horarios de Atención
            </h1>
            <p>Gestión de horarios de atención médica</p>
          </div>

          <section className="card-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-user-md"></i> Listado de Doctores
              </h2>
              <button className="btn-primary" onClick={abrirModal}>
                <i className="fas fa-plus"></i> Nuevo Horario
              </button>
            </div>

            {loadingDoctores ? (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin"></i> Cargando doctores...
              </div>
            ) : errorDoctores ? (
              <div className="error-state">
                <i className="fas fa-exclamation-triangle"></i> {errorDoctores}
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nombre Completo</th>
                      <th>Especialidad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctores.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="no-data">
                          <i className="fas fa-user-slash"></i> No hay doctores
                          registrados
                        </td>
                      </tr>
                    ) : (
                      doctores.map((doc) => (
                        <tr key={doc.idDoctor}>
                          <td>{`${doc.primerNombre} ${doc.primerApellido}`}</td>
                          <td>{doc.especialidad}</td>
                          <td>
                            <button
                              className="btn-action view-btn"
                              onClick={() => verHorariosDoctor(doc)}
                              title="Ver horarios"
                            >
                              <i className="fas fa-clock"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Modal para ver horarios */}
          {modalHorariosOpen && (
            <div className="modal-overlay" onClick={cerrarModalHorarios}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={cerrarModalHorarios}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="modal-header">
                  <i className="fas fa-calendar-week modal-icon"></i>
                  <h3>
                    Horarios de {doctorSeleccionado?.primerNombre}{" "}
                    {doctorSeleccionado?.primerApellido}
                  </h3>
                </div>

                {loadingHorarios ? (
                  <div className="loading-state">
                    <i className="fas fa-spinner fa-spin"></i> Cargando
                    horarios...
                  </div>
                ) : errorHorarios ? (
                  <div className="error-state">
                    <i className="fas fa-exclamation-triangle"></i>{" "}
                    {errorHorarios}
                  </div>
                ) : horarios.length === 0 ? (
                  <div className="no-data">
                    <i className="fas fa-calendar-times"></i> No hay horarios
                    registrados
                  </div>
                ) : (
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Día</th>
                          <th>Hora Inicio</th>
                          <th>Hora Fin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {horarios.map((h) => (
                          <tr key={h.idHorario}>
                            <td>{h.diaSemana}</td>
                            <td>
                              {h.horaInicio.split(":").slice(0, 2).join(":")}
                            </td>
                            <td>
                              {h.horaFin.split(":").slice(0, 2).join(":")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal para registrar horario */}
          {modalOpen && (
            <div className="modal-overlay" onClick={cerrarModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={cerrarModal}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="modal-header">
                  <i className="fas fa-calendar-plus modal-icon"></i>
                  <h3>Registrar Nuevo Horario</h3>
                </div>

                <form className="form-modal" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user-md"></i> Doctor*
                    </label>
                    {loadingDoctores ? (
                      <div className="loading-state">
                        <i className="fas fa-spinner fa-spin"></i> Cargando
                        doctores...
                      </div>
                    ) : errorDoctores ? (
                      <div className="error-state">
                        <i className="fas fa-exclamation-triangle"></i>{" "}
                        {errorDoctores}
                      </div>
                    ) : (
                      <select
                        name="idDoctor"
                        value={form.idDoctor}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Seleccione un doctor</option>
                        {doctores.map((doc) => (
                          <option key={doc.idDoctor} value={doc.idDoctor}>
                            {doc.primerNombre} {doc.primerApellido} -{" "}
                            {doc.especialidad}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      <i className="fas fa-calendar-day"></i> Día de la Semana*
                    </label>
                    <select
                      name="diaSemana"
                      value={form.diaSemana}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="LUNES">Lunes</option>
                      <option value="MARTES">Martes</option>
                      <option value="MIERCOLES">Miércoles</option>
                      <option value="JUEVES">Jueves</option>
                      <option value="VIERNES">Viernes</option>
                      <option value="SABADO">Sábado</option>
                      <option value="DOMINGO">Domingo</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        <i className="fas fa-clock"></i> Hora Inicio*
                      </label>
                      <input
                        name="horaInicio"
                        value={form.horaInicio}
                        onChange={handleChange}
                        required
                        type="time"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <i className="fas fa-clock"></i> Hora Fin*
                      </label>
                      <input
                        name="horaFin"
                        value={form.horaFin}
                        onChange={handleChange}
                        required
                        type="time"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {mensaje && (
                    <div className="success-state">
                      <i className="fas fa-check-circle"></i> {mensaje}
                    </div>
                  )}

                  {error && (
                    <div className="error-state">
                      <i className="fas fa-exclamation-circle"></i> {error}
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={cerrarModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>{" "}
                          Registrando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save"></i> Registrar Horario
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default HorarioAtencionDoctores;
