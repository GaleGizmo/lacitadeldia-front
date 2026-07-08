# La Cita Del Día 🎬

**La Cita Del Día** es un juego diario de tipo Wordle en el que tienes que descubrir una cita famosa de una película. Cada día a las 7AM se publica una nueva cita con sus letras ocultas.

🌐 **[lacitadeldia.com](https://www.lacitadeldia.com)**

---

## Cómo se juega

1. Introduce palabras de **5 letras** para descubrir las letras que forman la cita.
2. Las letras que coincidan con las de la cita se revelarán en **verde** dentro de la frase.
3. El teclado en pantalla muestra en verde las letras acertadas y en gris las descartadas.
4. No es posible resolver la frase completa de una sola vez; hay que ir descubriendo letra a letra.
5. Las partidas no completadas antes de las **7AM** del día siguiente se consideran **perdidas**.

### Dificultad
El número de intentos disponibles varía entre **3 y 7** según la longitud de la cita y las letras poco comunes que contenga.

---

## Sistema de puntos

| Acción | Puntos |
|---|---|
| Letra descubierta | +1 |
| Cita completada | +20 |
| Intento no usado al ganar | +10 |
| Ver detalles de cita perdida | −5 |

Los puntos acumulados determinan la posición del jugador en el ranking global.

---

## Pistas (Clues)

Durante la partida se pueden usar pistas a cambio de puntos:

| Pista | Coste |
|---|---|
| Revelar la letra más difícil | 20 pts |
| Comparar letras comunes | 10 pts |
| Mostrar el actor | 5 pts |
| Mostrar el director | 5 pts |
| Bloc de notas (apuntar letras) | Gratis |

Cada día, una de las pistas estará disponible **de forma gratuita** de manera aleatoria.

---

## Bonificaciones por rachas

- **7 partidas jugadas consecutivas**: pistas de Actor, Director y Comparar Letras **gratis** en la cita del día siguiente.
- **7 partidas ganadas consecutivas**: **todas las pistas gratis** en la cita del día siguiente.

Las rachas se reinician si no se juega la cita del día antes de las 7AM. Las citas de días anteriores no cuentan para las rachas.

---

## Páginas y funcionalidades

- **Juego del día** (`/`) — Partida principal con la cita del día.
- **Citas pasadas** (`/oldgames`) — Historial de citas anteriores con estado (ganada, perdida, en juego, no jugada).
- **Ranking** (`/ranking`) — Posición global del jugador, estadísticas y rachas actuales.
- **Información** (`/info`) — Reglas completas del juego.
- **Contacto** (`/contact`) — Formulario de contacto.
- **Gestión de usuario** (`/usermanager`) — Exportar/importar el ID de usuario como archivo JSON para no perder el progreso al limpiar cookies.
- **Política de privacidad** (`/privacy-policy`)

---

## Gestión de usuario

La Cita Del Día identifica a cada jugador mediante un ID único almacenado en **cookie** y **localStorage**. Para evitar perder el progreso:

- Usa **"Guardar usuario"** para descargar un archivo `userLaCitaDelDia.json` con tu ID.
- Usa **"Cargar usuario"** para restaurar tu ID desde ese archivo.

> ⚠️ Los modos incógnito (Android) y privado (iOS) pueden borrar los datos automáticamente.

---

## Compartir resultados

Al finalizar la partida se puede compartir el resultado directamente en **WhatsApp**, **Telegram** o **X (Twitter)**.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [React 18](https://react.dev/) | UI |
| [Vite 5](https://vitejs.dev/) | Bundler y dev server |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Estado global (juego, usuario, notificaciones) |
| [React Router DOM 6](https://reactrouter.com/) | Enrutado SPA |
| [Axios](https://axios-http.com/) | Llamadas a la API REST del backend |
| [Sonner](https://sonner.emilkowal.ski/) | Notificaciones toast |
| [js-cookie](https://github.com/js-cookie/js-cookie) | Gestión de cookies |
| [react-cookie-consent](https://github.com/Mastermindzh/react-cookie-consent) | Banner de consentimiento de cookies |

---

## Desarrollo local

### Requisitos
- Node.js 18+
- npm

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_APP_BASE_URL=https://tu-backend.com
VITE_APP_DAILY_URL=/api/phrase/daily
VITE_APP_ADD_PHRASE=/api/phrase/add
```

### Instalación y arranque

```bash
npm install
npm run dev
```

### Otros scripts

```bash
npm run build    # Genera la build de producción en /dist
npm run preview  # Sirve la build de producción localmente
npm run lint     # Ejecuta ESLint
```

---

## Despliegue

El proyecto incluye configuración para **Vercel** (`vercel.json`) y **CapRover** (`captain-definition`).
