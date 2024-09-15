import "./PrivacyPolicy.css"

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Política de Privacidad</h1>
      <p><strong>Última actualización:</strong> [Fecha]</p>

      <p>En <strong>La Cita del Día</strong> (<a href="https://www.lacitadeldia.com" target="_blank" rel="noopener noreferrer">https://www.lacitadeldia.com</a>), valoramos tu privacidad y queremos que comprendas cómo recolectamos y utilizamos información cuando visitas nuestro sitio web. Nuestra prioridad es garantizar la protección de tus datos personales y mantener un entorno seguro y transparente.</p>

      <h2>1. Información que no recopilamos</h2>
      <ul>
        <li>No realizamos la <strong>gestión de usuarios</strong>. No recolectamos datos de registro, contraseñas, nombres de usuario, ni otra información personal directa.</li>
        <li>No recolectamos información que permita identificarte personalmente, como nombre, dirección de correo electrónico o número de teléfono, a menos que lo proveas voluntariamente a través de formularios de contacto u otros medios de comunicación que puedas utilizar en nuestro sitio.</li>
      </ul>

      <h2>2. Estadísticas con Plausible Analytics</h2>
      <p>
        Para analizar el tráfico de nuestro sitio web y mejorar tu experiencia de navegación, utilizamos <strong>Plausible Analytics</strong>, una herramienta de análisis que no rastrea usuarios individuales ni almacena cookies en tu navegador.
      </p>
      <ul>
        <li>
          <strong>Datos recopilados por Plausible:</strong> Plausible recopila estadísticas de uso anónimas, como el número de visitantes, las páginas visitadas, la duración de la visita, el tipo de dispositivo, el sistema operativo y el país de origen. Toda la información es completamente anónima y no se puede usar para identificarte personalmente.
        </li>
        <li>
          <strong>No utilizamos cookies</strong> para estadísticas ni recopilamos datos personales a través de Plausible. Plausible opera en conformidad con la normativa de privacidad europea (GDPR) y no rastrea ni recopila ningún dato de identificación personal.
        </li>
      </ul>

      <h2>3. Cookies</h2>
      <p>
        Nuestro sitio web no utiliza <strong>cookies</strong> de seguimiento. Las cookies que puedas encontrar en nuestro sitio son estrictamente necesarias para su funcionamiento básico, como la navegación o la carga de contenido.
      </p>

      <h2>4. Enlaces a sitios de terceros</h2>
      <p>
        Nuestro sitio web puede contener enlaces a otras páginas web. Una vez que accedas a estos enlaces y abandones nuestro sitio, no tenemos control sobre esos otros sitios. Por lo tanto, no somos responsables de la protección y privacidad de la información que puedas proporcionar en esos sitios. Te recomendamos revisar las políticas de privacidad de los sitios web de terceros que visites.
      </p>

      <h2>5. Cambios en la política de privacidad</h2>
      <p>
        Nos reservamos el derecho de actualizar esta política de privacidad cuando sea necesario para reflejar cambios en nuestras prácticas de privacidad o por motivos legales. Cualquier modificación será publicada en esta página con la fecha de la última actualización.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Si tienes preguntas o inquietudes sobre esta política de privacidad o el tratamiento de tus datos, por favor contáctanos a través de: <a href="mailto:tuemail@lacitadeldia.com">[Tu correo electrónico de contacto]</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
