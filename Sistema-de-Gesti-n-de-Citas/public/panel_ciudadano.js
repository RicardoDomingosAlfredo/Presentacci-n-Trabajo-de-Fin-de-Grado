function protegerCiudadano() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (!token || !user) {
    alert("Debes iniciar sesión para acceder a este panel.");
    window.location.href = "index.html";
    return;
  }

  if (user.rol.toLowerCase() !== "ciudadano") {
    alert("Acceso denegado. Solo ciudadanos.");
    window.location.href = "index.html";
    return;
  }

  // Mostrar datos
  document.getElementById("ciudadano-name").innerText = user.nombre;
  document.getElementById("ciudadano-email").innerText = user.email;
  document.getElementById("ciudadano-role").innerText = user.rol;

  console.log(`Bienvenido ${user.nombre} (${user.email})`);
}

function mostrarResultado(html) {
  document.getElementById("contenido").innerHTML = html;
}

async function marcarCita() {
  const fecha = prompt("Introduce la fecha de la cita (YYYY-MM-DD HH:MM):");
  const servicio = prompt("Servicio (ej: Atención General):");
  if (!fecha || !servicio) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/citas", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ fecha_hora: fecha, servicio })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    mostrarResultado(`<p style="color:green;"> Cita marcada para el ${fecha}</p>`);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

async function cancelarCita() {
  const citaId = prompt("Introduce el ID de la cita a cancelar:");
  if (!citaId) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/api/citas/${citaId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    mostrarResultado(`<p style="color:orange;"> Cita #${citaId} cancelada.</p>`);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

async function modificarCita() {
  const citaId = prompt("Introduce el ID de la cita a modificar:");
  const nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD HH:MM):");
  if (!citaId || !nuevaFecha) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/api/citas/${citaId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ fecha_hora: nuevaFecha })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    mostrarResultado(`<p style="color:blue;"> Cita #${citaId} reprogramada para ${nuevaFecha}</p>`);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

// Historial de citas
async function historialCita() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/citas/mis-citas", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const citas = await response.json();
    if (!response.ok) throw new Error(citas.message);

    if (citas.length === 0) {
      mostrarResultado("<p>No tienes citas registradas.</p>");
      return;
    }

    let tabla = "<h4>📖 Historial:</h4><table border='1' cellpadding='5'><tr><th>ID</th><th>Fecha</th><th>Estado</th></tr>";
    citas.forEach(c => {
      tabla += `<tr><td>${c.id}</td><td>${c.fecha_hora}</td><td>${c.estado}</td></tr>`;
    });
    tabla += "</table>";

    mostrarResultado(tabla);
  } catch (err) {
    mostrarResultado(`<p style="color:red;">❌ ${err.message}</p>`);
  }
}

async function notificacion() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/notificaciones", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const notificaciones = await response.json();
    if (!response.ok) throw new Error(notificaciones.message);

    if (notificaciones.length === 0) {
      mostrarResultado("<p>🔔 No tienes notificaciones.</p>");
      return;
    }

    let lista = "<ul>";
    notificaciones.forEach(n => {
      lista += `<li>[${n.tipo}] ${n.mensaje} - ${n.fecha_creacion}</li>`;
    });
    lista += "</ul>";

    mostrarResultado(lista);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}
