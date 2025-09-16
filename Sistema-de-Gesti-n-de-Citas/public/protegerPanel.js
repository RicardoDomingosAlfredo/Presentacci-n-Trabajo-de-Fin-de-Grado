function protegerPanel(rolPermitido) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!token || !user) {
    alert("Debes iniciar sesión para acceder a este panel.");
    window.location.href = "index.html";
    return;
  }

  if (rolPermitido && user.rol.toLowerCase() !== rolPermitido.toLowerCase()) {
    alert("No tienes permisos para acceder a este panel.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("welcome-msg").innerText = `Bienvenido, ${user.nombre} (${user.rol})`;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
