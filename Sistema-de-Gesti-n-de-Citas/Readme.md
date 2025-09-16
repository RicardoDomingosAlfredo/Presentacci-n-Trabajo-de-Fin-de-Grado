# 📌 Sistema de Gestión de Citas – Angola

Este proyecto implementa un sistema digital de gestión de citas para **ciudadanos, funcionarios y administradores**.  
El objetivo es modernizar la atención al ciudadano en los servicios de identificación de Angola, reduciendo tiempos de espera y mejorando la organización de las oficinas.  

---

## 📂 Estructura del Proyecto

```plaintext
project/
├── backend/                  # Lógica del servidor y APIs
│   ├── src/
│   │   ├── api/              # Endpoints (routes, controllers, middlewares)
│   │   ├── core/             # Lógica de negocio (services, models, utils, constants)
│   │   ├── database/         # Migraciones, seeds y conexión a la BD
│   │   ├── config/           # Configuración general
│   │   ├── tests/            # Pruebas unitarias
│   │   └── index.js          # Punto de entrada backend
│   ├── package.json
│   └── .env
│
├── frontend/                 # Interfaz de usuario
│   ├── src/
│   │   ├── api/              # Servicios para consumir APIs
│   │   ├── components/       # Componentes reutilizables
│   │   ├── features/         # Funcionalidades por rol
│   │   ├── store/            # Estado global
│   │   ├── styles/           # Estilos
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── .env
│
├── scripts/                  # Scripts útiles (reset DB, seed DB)
├── README.md
└── .gitignore
