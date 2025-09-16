# Estructura del Proyecto — Sistema de Gestión de Citas

Este documento describe la organización de carpetas y archivos del **Sistema de Gestión de Citas para la Provincia de Bengo (Angola)**.  

---

##  Proyecto

```plaintext
Sistema-de-Gestion-de-Citas/
├── config/                  # Configuración general y conexión a la base de datos
│   └── db.js
├── controllers/             # Lógica de negocio para cada módulo
│   ├── authController.js
│   ├── citasController.js
│   ├── ciudadanosController.js
│   ├── notificacionesController.js
│   ├── oficinasController.js
│   └── usersController.js
├── middleware/              # Validación y autenticación
│   └── authMiddleware.js
├── routes/                  # Endpoints de la API
│   ├── authRoutes.js
│   ├── citaRoutes.js
│   ├── ciudadanosRoutes.js
│   ├── notificacionesRoutes.js
│   ├── oficinasRoutes.js
│   └── usersRoutes.js
├── public/                  # Archivos estáticos del frontend
│   ├── index.html
│   ├── login.html
│   ├── registro.html
│   ├── panel_administrador.html
│   ├── panel_funcionario.html
│   ├── panel_ciudadano.html
│   ├── styles.css
│   ├── script.js
│   └── ...otros archivos
├── node_modules/            # Dependencias Node.js
├── .env                     # Variables de entorno
├── package.json             # Dependencias del proyecto
├── package-lock.json        # Bloqueo de dependencias
├── server.js                # Punto de entrada del servidor
└── README.md                # Documentación del proyecto

