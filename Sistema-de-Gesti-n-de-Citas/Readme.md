Sistema-de-Gestion-de-Citas/
├── config/                  # Configuración general y conexión a la base de datos
│   └── db.js                # Configuración de la base de datos
├── controllers/             # Lógica de negocio para cada módulo
│   ├── authController.js    # Autenticación y registro de usuarios
│   ├── citasController.js   # Gestión de citas (crear, modificar, cancelar)
│   ├── ciudadanosController.js # Lógica de ciudadanos
│   ├── notificacionesController.js # Envío de notificaciones automáticas
│   ├── oficinasController.js # Gestión de oficinas y disponibilidad
│   └── usersController.js   # Gestión de usuarios (funcionarios y administradores)
├── middleware/              # Middlewares de autenticación y validación
│   └── authMiddleware.js
├── routes/                  # Definición de endpoints de la API
│   ├── authRoutes.js
│   ├── citaRoutes.js
│   ├── ciudadanosRoutes.js
│   ├── notificacionesRoutes.js
│   ├── oficinasRoutes.js
│   └── usersRoutes.js
├── public/                  # Archivos estáticos (frontend básico)
│   ├── index.html
│   ├── login.html
│   ├── registro.html
│   ├── panel_administrador.html
│   ├── panel_funcionario.html
│   ├── panel_ciudadano.html
│   ├── styles.css
│   ├── script.js
│   └── ...otros html/js
├── node_modules/            # Dependencias Node.js
├── .env                     # Variables de entorno (credenciales, DB, JWT, etc.)
├── package.json             # Dependencias del proyecto
├── package-lock.json        # Bloqueo de dependencias
├── server.js                # Punto de entrada del servidor
└── README.md                # Documentación del proyecto
