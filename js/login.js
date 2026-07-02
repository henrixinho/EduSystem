<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Buscamos el formulario o el botón de ingresar de tu Login
        // Nota: Asegúrate de que tus inputs tengan estos mismos ID o cámbialos por los tuyos
        const btnIngresar = document.querySelector('.login-btn') || document.getElementById('btn-login');
        
        if (btnIngresar) {
            btnIngresar.addEventListener('click', (e) => {
                e.preventDefault(); // Evitamos que la página se recargue sola
                
                // Capturamos los campos de texto del login
                const usuarioInput = document.getElementById('username') || document.querySelector('input[type="text"]');
                const passwordInput = document.getElementById('password') || document.querySelector('input[type="password"]');
                
                if (!usuarioInput || !passwordInput) {
                    alert("Error interno: No se encontraron los campos de usuario o contraseña.");
                    return;
                }

                const usuario = usuarioInput.value.trim();
                const password = passwordInput.value.trim();

                // Validación estricta que solicitaste
                if (usuario === 'henry' && password === '1234') {
                    // Guardamos una "llave" temporal en el navegador para saber que sí inició sesión
                    localStorage.setItem('session_login', 'true');
                    // Redireccionamos al panel
                    window.location.href = 'dashboard.html';
                } else {
                    alert('❌ Usuario o contraseña incorrectos. Inténtalo de nuevo.');
                }
            });
        }
    });
</script>
