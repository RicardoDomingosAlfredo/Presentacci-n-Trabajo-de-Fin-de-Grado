## Estructura del Proyecto

```plaintext
SISTEMA-DE-GESTION-DE-CITAS/
├── config/                  # Configuración de la base de datos
│   └── db.js
│
├── controllers/             # Controladores para la lógica de negocio
│   ├── authController.js
│   ├── citasController.js
│   ├── ciudadanosController.js
│   ├── notificacionesController.js
│   ├── oficinasController.js
│   ├── userController.js
│   └── usersController.js
│
├── middlewares/             # Middlewares de autenticación y validación
│   └── authMiddleware.js
│
├── routes/                  # Definición de rutas de la API
│   ├── authRoutes.js
│   ├── citaRoutes.js
│   ├── citasRoutes.js
│   ├── ciudadanosRoutes.js
│   ├── notificacionesRoutes.js
│   ├── oficinasRoutes.js
│   └── userRoutes.js
│
├── public/                  # Interfaz de usuario (Frontend HTML, CSS, JS)
│   ├── index.html
│   ├── login.js
│   ├── registro.html
│   ├── registro.js
│   ├── panel_ciudadano.html
│   ├── panel_ciudadano.js
│   ├── panel_funcionario.html
│   ├── panel_funcionario.js
│   ├── panel_administrador.html
│   ├── panel_administrador.js
│   ├── styles.css
│   └── ... (otros .html, .js auxiliares)
│
├── server.js                # Punto de entrada del servidor
├── package.json             # Dependencias del proyecto
├── package-lock.json
├── .env                     # Variables de entorno
└── .gitignore               # Archivos ignorados por Git

---

