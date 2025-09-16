
function protegerAdmin() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (!token || !user) {
    alert("Debes iniciar sesión para acceder a este panel.");
    window.location.href = "index.html";
    return;
  }

  if (user.rol.toLowerCase() !== "administrador") {
    alert("Acceso denegado. Solo administradores.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("admin-name").innerText = user.nombre;
  document.getElementById("admin-email").innerText = user.email;
  document.getElementById("admin-role").innerText = user.rol;

  cargarUsuarios();
}

function mostrarResultado(html) {
  document.getElementById("contenido").innerHTML = html;
}

async function cargarUsuarios() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:4000/api/users", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error cargando usuarios");

    const tabla = document.getElementById("users-table");
    tabla.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Usuario</th>
        <th>Email</th>
        <th>Teléfono</th>
        <th>Rol</th>
        <th>Acciones</th>
      </tr>
    `;

    data.forEach(u => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${u.id}</td>
        <td>${u.nombre}</td>
        <td>${u.nombre_usuario}</td>
        <td>${u.email}</td>
        <td>${u.telefono || "-"}</td>
        <td>${u.rol}</td>
        <td>
          <button onclick="verUsuario(${u.id})">👁️ Ver</button>
          <button onclick="editarUsuario(${u.id})">✏️ Editar</button>
          <button onclick="eliminarUsuario(${u.id})">🗑️ Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

function verUsuario(id) {
  mostrarResultado(`<p>👁️ Mostrando información del usuario con ID ${id} (pendiente backend).</p>`);
}

function editarUsuario(id) {
  mostrarResultado(`<p> Editar usuario con ID ${id} (pendiente backend).</p>`);
}

async function eliminarUsuario(id) {
  if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    alert(" Usuario eliminado correctamente");
    cargarUsuarios();
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}


async function listarOficinas() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/oficinas", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const oficinas = await response.json();
    if (!response.ok) throw new Error(oficinas.message || "Error listando oficinas");

    let html = `
      <h3>🏢 Oficinas registradas</h3>
      <table border="1" style="width:100%; border-collapse:collapse;">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Horario</th>
          <th>Acciones</th>
        </tr>
    `;

    oficinas.forEach(o => {
      html += `
        <tr>
          <td>${o.id}</td>
          <td>${o.nombre}</td>
          <td>${o.direccion}</td>
          <td>${o.telefono || "-"}</td>
          <td>${o.horario_apertura} - ${o.horario_cierre}</td>
          <td>
            <button onclick="editarOficina(${o.id})">✏️ Editar</button>
            <button onclick="eliminarOficina(${o.id})">🗑️ Eliminar</button>
          </td>
        </tr>
      `;
    });

    html += "</table>";
    mostrarResultado(html);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

async function anadirOficina() {
  const nombre = prompt("Nombre de la oficina:");
  const direccion = prompt("Dirección de la oficina:");
  const telefono = prompt("Teléfono:");
  const horario_apertura = prompt("Horario apertura (HH:MM, ej: 08:00):", "08:00");
  const horario_cierre = prompt("Horario cierre (HH:MM, ej: 17:00):", "17:00");

  if (!nombre || !direccion) {
    alert(" El nombre y la dirección son obligatorios.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/oficinas", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, direccion, telefono, horario_apertura, horario_cierre })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    mostrarResultado(`<p style="color:green;"> ${data.message}</p>`);
    listarOficinas();
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

function editarOficina(id) {
  mostrarResultado(`<p> Editar oficina con ID ${id} (pendiente implementar).</p>`);
}

async function eliminarOficina(id) {
  if (!confirm("¿Seguro que deseas eliminar esta oficina?")) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/api/oficinas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    alert(" Oficina eliminada correctamente");
    listarOficinas();
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}


function gestionarCitas() { mostrarResultado("<p>📅 Gestión de citas en desarrollo.</p>"); }
function verEstadisticasCitas() { mostrarResultado("<p>📊 Estadísticas de citas (pendiente implementar).</p>"); }
function configuracionOficina() { listarOficinas(); }
function configurarHorarios() { mostrarResultado("<p>⏰ Configuración de horarios (pendiente implementar).</p>"); }
function ajustesSistema() { mostrarResultado("<p>🔧 Ajustes del sistema (pendiente implementar).</p>"); }
function generarReportesMensuales() { mostrarResultado("<p>📑 Generación de reportes (pendiente implementar).</p>"); }
function verTodoReporte() { mostrarResultado("<p>📂 Visualización completa de reportes (pendiente implementar).</p>"); }


function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}


window.onload = protegerAdmin;
window.cargarUsuarios = cargarUsuarios;
window.verUsuario = verUsuario;
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;
window.listarOficinas = listarOficinas;
window.anadirOficina = anadirOficina;
window.editarOficina = editarOficina;
window.eliminarOficina = eliminarOficina;
window.gestionarCitas = gestionarCitas;
window.verEstadisticasCitas = verEstadisticasCitas;
window.configuracionOficina = configuracionOficina;
window.configurarHorarios = configurarHorarios;
window.ajustesSistema = ajustesSistema;
window.generarReportesMensuales = generarReportesMensuales;
window.verTodoReporte = verTodoReporte;
window.cerrarSesion = cerrarSesion;
