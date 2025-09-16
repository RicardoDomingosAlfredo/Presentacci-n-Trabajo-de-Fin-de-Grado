async function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const contrasena = document.getElementById("contrasena").value;

  if (!email || !contrasena) {
    alert(" Ingresa tu correo y contraseña");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasena })
    });

    const data = await response.json(); 

    console.log("ROL recibido:", data.usuario.rol); 

    if (!response.ok) {
      throw new Error(data.message || "Error en el inicio de sesión");
    }

  
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    
 if (data.usuario.rol === "administrador") {
  window.location.href = "panel_administrador.html";
} else if (data.usuario.rol === "funcionario") {
  window.location.href = "panel_funcionario.html";
} else {
  window.location.href = "panel_ciudadano.html";
}


  } catch (error) {
    console.error("Error en login:", error);
    alert("❌ " + error.message);
  }
}

document.getElementById("loginForm").addEventListener("submit", login);
