document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#contrasena');
    const loginForm = document.querySelector('#loginForm');

    // Mantiene la funcionalidad original del ojo para ver/ocultar contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Redirección directa al dar clic en Ingresar
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue sola
            
            // Te lleva directo a tu página en blanco de la versión 2
            window.location.href = 'dashboard.html';
        });
    }
});
