const API_BASE_URL = "https://aplicacion-jfw5.onrender.com/api/v1";

export const mensajeService = {
  // Obtener todos los mensajes
  async obtenerMensajes() {
    try {
      const response = await fetch(`${API_BASE_URL}/mensaje`);
      if (!response.ok) {
        throw new Error("Error al obtener mensajes");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en obtenerMensajes:", error);
      throw error;
    }
  },

  // Obtener mensajes no vistos
  async obtenerMensajesNoVistos() {
    try {
      const response = await fetch(`${API_BASE_URL}/mensaje/no-vistos`);
      if (!response.ok) {
        throw new Error("Error al obtener mensajes no vistos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en obtenerMensajesNoVistos:", error);
      throw error;
    }
  },

  // Marcar mensaje como visto
  async marcarComoVisto(id) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/mensaje/${id}/marcar-visto`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al marcar mensaje como visto");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en marcarComoVisto:", error);
      throw error;
    }
  },
};
