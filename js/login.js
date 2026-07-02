document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#contrasena');
    const loginForm = document.querySelector('#loginForm');

    // Funcionalidad original del ojo para ver/ocultar contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Validación estricta de credenciales
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue sola

            const usuario = document.querySelector('#usuario').value.trim();
            const contrasena = document.querySelector('#contrasena').value.trim();

            // Validación: Solo ingresa con henry y 1234
            if (usuario === 'henry' && contrasena === '1234') {
                window.location.href = 'dashboard.html';
            } else {
                alert('Usuario o contraseña incorrectos. Intente nuevamente.');
            }
        });
    }
});
