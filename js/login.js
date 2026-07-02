document.addEventListener('DOMContentLoaded', () => {
    // Buscamos el botón real de tu formulario usando la clase que se ve en tu login
    const btnIngresar = document.querySelector('.login-btn') || document.querySelector('button');

    if (btnIngresar) {
        btnIngresar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Capturamos los inputs del login (por tipo, tal como se ve en tu diseño)
            const usuarioInput = document.querySelector('input[type="text"]');
            const passwordInput = document.querySelector('input[type="password"]');

            if (!usuarioInput || !passwordInput) {
                alert("Error: No se encontraron los campos de usuario o contraseña.");
                return;
            }

            const usuario = usuarioInput.value.trim();
            const password = passwordInput.value.trim();

            // Validación solicitada
            if (usuario === 'henry' && password === '1234') {
                // Creamos un token de sesión seguro en el navegador
                localStorage.setItem('session_login', 'true');
                // Redirecciona a tu panel
                window.location.href = 'dashboard.html';
            } else {
                alert('❌ Usuario o contraseña incorrectos. Inténtalo de nuevo.');
            }
        });
    }
});
