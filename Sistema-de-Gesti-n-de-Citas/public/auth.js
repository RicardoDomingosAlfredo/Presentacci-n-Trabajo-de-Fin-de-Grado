document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));

    const role = (data.user.rol || '').toLowerCase();

    switch (role) {
      case 'admin':
        window.location.href = '/panel_administrador.html';
        break;
      case 'funcionario':
        window.location.href = '/panel_funcionario.html';
        break;
      case 'ciudadano':
        window.location.href = '/panel_ciudadano.html';
        break;
      default:
        alert('Rol no reconocido. Redirigiendo al inicio.');
        window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Error en login:', error);
    alert(error.message || 'Error inesperado al iniciar sesión.');
  }
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}
