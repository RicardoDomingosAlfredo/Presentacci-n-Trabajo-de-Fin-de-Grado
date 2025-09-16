async function register(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const nombre_usuario = document.getElementById("nombre_usuario").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;
  const rol = document.getElementById("rol").value;

  if (!nombre || !apellido || !nombre_usuario || !email || !contrasena) {
    alert("⚠️ Completa todos los campos obligatorios.");
    return;
  }

  if (contrasena !== confirmar) {
    alert("⚠️ Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        apellido,
        nombre_usuario,
        email,
        telefono,
        contrasena, 
        rol
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en el registro");
    }

    alert(" Usuario registrado exitosamente");
    window.location.href = "index.html"; 
  } catch (error) {
    console.error(" Error en registro:", error);
    alert(" Error: " + error.message);
  }
}

document.getElementById("registerForm").addEventListener("submit", register);
