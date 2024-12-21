import Cookies from "js-cookie";
import "./UserManager.css";

const UserManager = () => {
  // Función para exportar el userId a un archivo JSON
  const handleExport = () => {
    const userId =
      Cookies.get("laCitaDelDiaUserId") ||
      localStorage.getItem("laCitaDelDiaUserId");

    if (!userId) {
      alert("No se encontró ningún ID de usuario para exportar.");
      return;
    }

    const userData = { userId };
    const json = JSON.stringify(userData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "userId.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Función para importar el userId desde un archivo JSON
  const handleImport = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("Por favor selecciona un archivo JSON.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const userData = JSON.parse(e.target.result);

        if (!userData.userId) {
          throw new Error("El archivo no contiene un ID de usuario válido.");
        }

        Cookies.set("laCitaDelDiaUserId", userData.userId);
        localStorage.setItem("laCitaDelDiaUserId", userData.userId);

        alert("¡ID de usuario restaurado exitosamente!");
      } catch (error) {
        alert(`Error al importar el ID de usuario: ${error.message}`);
      }
    };

    reader.onerror = () => {
      alert("Error al leer el archivo. Por favor, inténtalo de nuevo.");
    };

    reader.readAsText(file);
  };

  return (
    <div className="user-id-manager">
      <div className="manager-button-container">
        <p>Guarda tu Identificador de Usuario</p>
        <button onClick={handleExport} className="export-button">
          Guardar Usuario
        </button>{" "}
      </div>
      <div className="manager-button-container">
      <p>Carga tu Identificador de Usuario</p>
        <label htmlFor="import-file" className="import-label">
          Cargar Usuario
        </label>
        <input
          type="file"
          id="import-file"
          accept="application/json"
          onChange={handleImport}
          className="import-input"
        />{" "}
      </div>
    </div>
  );
};

export default UserManager;
