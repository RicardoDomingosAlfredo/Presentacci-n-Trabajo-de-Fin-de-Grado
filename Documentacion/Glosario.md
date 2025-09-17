#  Glosario del Sistema de Gestión de Citas – Angola

Este glosario recopila los términos clave utilizados en el proyecto para garantizar una comprensión común entre usuarios, desarrolladores y administradores.

---

# Términos Generales

- **Sistema de Gestión de Citas**  
  Plataforma digital que permite la programación, modificación, cancelación y seguimiento de citas en los servicios de identificación de Angola.
- **Bilhete de Identidade (BI)**
  Documento nacional de identidad en Angola.
- **Digitalización**  
  Proceso de transformar trámites manuales en procesos gestionados electrónicamente para optimizar la atención al ciudadano.

- **Panel**  
  Interfaz gráfica del sistema según el rol del usuario (Ciudadano, Funcionario o Administrador).

---

##  Roles del Sistema

- **Ciudadano**  
  Usuario final que solicita, cancela, modifica y consulta citas. Recibe notificaciones y accede a su historial.

- **Funcionario**  
  Usuario que atiende a los ciudadanos, gestiona citas pendientes, registra nuevos ciudadanos y administra horarios.

- **Administrador**  
  Usuario con control global del sistema. Gestiona oficinas, servicios, usuarios y reportes de actividad.

---

##  Conceptos Relacionados con Citas

- **Cita**  
  Registro digital que define fecha, hora, servicio, ciudadano asignado y estado de atención.

- **Estados de la Cita**  
  - **Pendiente**: Cita creada, aún no atendida.  
  - **Completada**: Cita atendida exitosamente.  
  - **Cancelada**: Cita anulada por el ciudadano o funcionario.  

- **Servicio**  
  Tipo de trámite solicitado por el ciudadano (ejemplo: renovación de bilhete de identidade, emisión de nuevo documento).

- **Oficina**  
  Dependencia física del Ministerio de Derechos Humanos donde se atienden las citas.

---

##  Notificaciones y Seguridad

- **Notificación**  
  Mensaje automático enviado al ciudadano para informar sobre confirmación, recordatorio o cambios en su cita.

- **Token JWT**  
  Mecanismo de seguridad utilizado para autenticar usuarios y proteger el acceso a los paneles del sistema.

- **Rol**  
  Nivel de acceso asignado a cada usuario: ciudadano, funcionario o administrador.

---

##  Tecnologías

- **Backend**: Node.js con Express, JWT, MySQL  
- **Frontend**: HTML, CSS y JavaScript puro.    
- **Infraestructura**: Scripts de migraciones, seeds y gestión de base de datos.

---
