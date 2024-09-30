import { toast } from "sonner";
import { addMessage } from "../../shared/api";
import "./Contact.css";
import { useState } from "react";

const ContactForm = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "", // Obligatorio

    content: "",
  });

  const [errors, setErrors] = useState({});

  // Manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      formData.name = "Anónimo";
    }

    // Validación: tipo de mensaje obligatorio
    if (!formData.type) {
      newErrors.type = "El tipo de mensaje es obligatorio.";
    }

    // Validación: al menos el campo Asunto o Mensaje debe estar rellenado
    if (!formData.content) {
      newErrors.content = "Debes rellenar el campo Mensaje.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Si no hay errores, devuelve true
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addMessage(formData);
        toast.success("Mensaje enviado correctamente", {
          style: { background: "#51e651" },
        });
        setFormData({
          name: "",
          email: "",
          type: "",

          content: "",
        });
        setErrors({});
      } catch (err) {
        console.error("Error al enviar el formulario:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario de contacto</h2>
      <h4>
        Puedes usar el siguiente formulario para contactar con nosotros, o si lo
        prefieres mandarnos un email a:{" "}
        <a href="mailto:info@lacitadeldia.com">[info@lacitadeldia.com]</a>
      </h4>

      <div>
        <label htmlFor="name">
          Nombre <span style={{ color: "grey" }}>(opcional)</span>:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="email">
          Email <span style={{ color: "grey" }}>(opcional)</span>:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="type">
          Asunto <span style={{ color: "red" }}>*</span>:
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="">Seleccione una opción</option>
          <option value="error">Problema</option>
          <option value="suggestion">Sugerencia</option>
          <option value="question">Pregunta</option>
          <option value="other">Otros</option>
        </select>
        {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
      </div>

      <div>
        <label htmlFor="content">
          Mensaje <span style={{ color: "red" }}>*</span>:
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
      </div>

      {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;
