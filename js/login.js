document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#contrasena');
    const loginForm = document.querySelector('#loginForm');

    // Mostrar/Ocultar contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Validación de ingreso y redirección
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Detiene el envío por defecto
            
            const usuario = document.querySelector('#usuario').value;
            const contrasena = document.querySelector('#contrasena').value;

            // Validación simple para tu simulación (puedes usar cualquier usuario)
            if (usuario.trim() !== "" && contrasena.trim() !== "") {
                // Redirige a la pantalla con la base de datos de estudiantes
                window.location.href = 'dashboard.html';
            } else {
                alert('Por favor, complete todos los campos.');
            }
        });
    }
});
