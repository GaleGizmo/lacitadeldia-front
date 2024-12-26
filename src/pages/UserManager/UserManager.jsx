import Cookies from "js-cookie";
import "./UserManager.css";
import { toast } from "sonner";

const UserManager = () => {
  // Función para exportar el userId a un archivo JSON
  const handleExport = () => {
    const userId =
      Cookies.get("laCitaDelDiaUserId") ||
      localStorage.getItem("laCitaDelDiaUserId");

    if (!userId) {
      toast.error("No se encontró ningún usuario para guardar.");
      return;
    }

    const userData = { userId };
    const json = JSON.stringify(userData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "userLaCitaDelDia.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Archivo guardado exitosamente.");
  };

  // Función para importar el userId desde un archivo JSON
  const handleImport = (event) => {
    const file = event.target.files[0];

    if (!file) {
      toast.error("Por favor selecciona el archivo correcto.");
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

        toast.success("¡Usuario restaurado exitosamente!");
      } catch (error) {
        toast.error(`Error al importar el ID de usuario: ${error.message}`);
      }
    };

    reader.onerror = () => {
      toast.error("Error al leer el archivo. Por favor, inténtalo de nuevo.");
    };

    reader.readAsText(file);
  };

  return (
    <div className="user-id-manager">
      <div className="manager-button-container">
        <p>Guarda tu Usuario</p>
        <button onClick={handleExport} className="export-button">
          Guardar Usuario
        </button>{" "}
      </div>
      <div className="manager-button-container">
        <p>Carga tu Usuario</p>
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
      <p>
        <strong className="win-txt">GUARDADO DEL USUARIO: </strong> Haz click en Guardar Usuario y se creará en la carpeta de descargas de tu
        dispositivo un archivo con el nombre <strong>userLaCitaDelDia</strong>.
        <p>
          <strong className="win-txt">RESTAURAR USUARIO: </strong> Haz click en Cargar Usuario y busca el archivo <strong>userLaCitaDelDia</strong>{" "}
          en tu dispositivo.
        </p>
        <small>
          <strong className="lose-txt">IMPORTANTE: </strong> Si vacías
          la carpeta de descargas recuerda copiar este archivo a otra ubicación.
        </small>
      </p>
    </div>
  );
};

export default UserManager;
