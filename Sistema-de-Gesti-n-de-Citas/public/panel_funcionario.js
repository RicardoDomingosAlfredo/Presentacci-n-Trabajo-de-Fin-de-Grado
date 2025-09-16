function protegerFuncionario() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (!token || !user) {
    alert("Debes iniciar sesión para acceder a este panel.");
    window.location.href = "index.html";
    return;
  }

  if (user.rol.toLowerCase() !== "funcionario") {
    alert("Acceso denegado. Solo funcionarios.");
    window.location.href = "index.html";
    return;
  }
  document.getElementById("funcionario-name").innerText = user.nombre;
  document.getElementById("funcionario-email").innerText = user.email;
  document.getElementById("funcionario-role").innerText = user.rol;
}

function mostrarResultado(html) {
  document.getElementById("contenido").innerHTML = html;
}

async function buscarCiudadano() {
  const dni = prompt("Introduce el DNI del ciudadano:");
  if (!dni) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/api/ciudadanos/${dni}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "No encontrado");

    mostrarResultado(`<p>👤 ${data.nombre} ${data.apellido} <br> 📧 ${data.email} <br> 📱 ${data.telefono}</p>`);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> Error: ${err.message}</p>`);
  }
}


async function registrarCiudadano() {
  const nombre = prompt("Nombre del ciudadano:");
  const apellido = prompt("Apellido:");
  const email = prompt("Correo:");
  const telefono = prompt("Teléfono:");
  const contrasena = prompt("Contraseña:");

  if (!nombre || !apellido || !email || !contrasena) {
    alert("⚠️ Todos los campos obligatorios");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/ciudadanos", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, apellido, email, telefono, contrasena })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    mostrarResultado(`<p style="color:green;"> Ciudadano registrado correctamente</p>`);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

// Ver citas
async function verCitas() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/citas", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const citas = await response.json();
    if (!response.ok) throw new Error(citas.message);

    if (citas.length === 0) {
      mostrarResultado("<p>No hay citas registradas.</p>");
      return;
    }

    let tabla = "<table border='1' cellpadding='5'><tr><th>ID</th><th>Ciudadano</th><th>Fecha</th><th>Estado</th></tr>";
    citas.forEach(c => {
      tabla += `<tr><td>${c.id}</td><td>${c.ciudadano}</td><td>${c.fecha_hora}</td><td>${c.estado}</td></tr>`;
    });
    tabla += "</table>";

    mostrarResultado(tabla);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

function verEstadisticas() {
  mostrarResultado(`
    <ul>
      <li>Total de citas: 25</li>
      <li>Citas completadas: 18</li>
      <li>Citas canceladas: 5</li>
      <li>Citas pendientes: 2</li>
    </ul>
  `);
}


function gestionarHorarios() {
  localStorage.setItem("horariosGestionados", "true");
  mostrarResultado("<p> Horarios actualizados correctamente (simulado)</p>");
}


async function atenderCitas() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Debes iniciar sesión");
      window.location.href = "index.html";
      return;
    }

    const response = await fetch("http://localhost:4000/api/citas/pendientes", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const citas = await response.json();
    if (!response.ok) throw new Error(citas.message);

    if (citas.length === 0) {
      mostrarResultado("<p> No hay citas pendientes por atender hoy.</p>");
      return;
    }

    let lista = "<h4>Citas pendientes:</h4><ul>";
    citas.forEach(c => {
      lista += `<li>#${c.id} - ${c.nombre} ${c.apellido} | ${c.fecha_hora} 
        <button onclick="completarCita(${c.id})">✔️ Completar</button> 
        <button onclick="cancelarCita(${c.id})"> Cancelar</button></li>`;
    });
    lista += "</ul>";

    mostrarResultado(lista);
  } catch (err) {
    mostrarResultado(`<p style="color:red;"> ${err.message}</p>`);
  }
}

// Completar cita
async function completarCita(id) {
  alert(` Cita #${id} marcada como COMPLETADA (pendiente implementar backend).`);
}

// Cancelar cita
async function cancelarCita(id) {
  alert(` Cita #${id} CANCELADA (pendiente implementar backend).`);
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}
