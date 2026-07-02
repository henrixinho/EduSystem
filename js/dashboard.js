document.addEventListener('DOMContentLoaded', () => {
    // Referencias de la interfaz
    const tablaEstudiantes = document.querySelector('#tablaEstudiantes');
    const formEstudiante = document.querySelector('#formEstudiante');
    const txtBuscar = document.querySelector('#txtBuscar');
    
    // Elementos del Modal
    const modal = document.querySelector('#modalEstudiante');
    const btnAbrirModal = document.querySelector('#btnAbrirModal');
    const btnCerrarModal = document.querySelector('#btnCerrarModal');
    const modalTitulo = document.querySelector('#modalTitulo');
    
    // Indicadores estadísticos
    const totalEstudiantesBox = document.querySelector('#totalEstudiantes');
    const totalActivosBox = document.querySelector('#totalActivos');

    // Base de datos simulada en LocalStorage
    let BD_ESTUDIANTES = JSON.parse(localStorage.getItem('bd_estudiantes')) || [
        { id: 1, codigo: 'A2026001', nombre: 'Henry Eduardo Yeren', especialidad: 'Ingeniería de Sistemas', estado: 'Activo' },
        { id: 2, codigo: 'A2026002', nombre: 'Ana María Torres', especialidad: 'Ingeniería Industrial', estado: 'Activo' },
        { id: 3, codigo: 'A2026003', nombre: 'Carlos Mendoza Cruz', especialidad: 'Arquitectura', estado: 'Inactivo' }
    ];

    // Función para renderizar y actualizar la tabla de datos
    function listarEstudiantes(filtro = '') {
        tablaEstudiantes.innerHTML = '';
        let contActivos = 0;

        // Filtrar datos según la búsqueda
        const datosFiltrados = BD_ESTUDIANTES.filter(est => 
            est.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
            est.codigo.toLowerCase().includes(filtro.toLowerCase())
        );

        datosFiltrados.forEach(est => {
            if(est.estado === 'Activo') contActivos++;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><strong>${est.codigo}</strong></td>
                <td>${est.nombre}</td>
                <td>${est.especialidad}</td>
                <td><span class="status-badge ${est.estado.toLowerCase()}">${est.estado}</span></td>
                <td>
                    <button class="btn-action edit" data-id="${est.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-action delete" data-id="${est.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tablaEstudiantes.appendChild(fila);
        });

        // Actualizar tarjetas del sistema
        totalEstudiantesBox.textContent = BD_ESTUDIANTES.length;
        totalActivosBox.textContent = contActivos;
        
        // Guardar cambios en el almacenamiento local
        localStorage.setItem('bd_estudiantes', JSON.stringify(BD_ESTUDIANTES));
        asignarEventosAcciones();
    }

    // Guardar o Editar Registro
    formEstudiante.addEventListener('submit', (e) => {
        e.preventDefault();
        const idEdit = document.querySelector('#estudianteId').value;
        const codigo = document.querySelector('#codigo').value;
        const nombre = document.querySelector('#nombre').value;
        const especialidad = document.querySelector('#especialidad').value;
        const estado = document.querySelector('#estado').value;

        if (idEdit) {
            // Acción: Editar fila
            BD_ESTUDIANTES = BD_ESTUDIANTES.map(est => 
                est.id == idEdit ? { id: parseInt(idEdit), codigo, nombre, specialty: especialidad, especialidad, estado } : est
            );
        } else {
            // Acción: Insertar nuevo
            const nuevoEstudiante = {
                id: Date.now(),
                codigo,
                nombre,
                especialidad,
                estado
            };
            BD_ESTUDIANTES.push(nuevoEstudiante);
        }

        listarEstudiantes();
        cerrarModalFunc();
    });

    // Control de eventos para los botones de la tabla
    function asignarEventosAcciones() {
        document.querySelectorAll('.btn-action.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if(confirm('¿Está seguro de eliminar este registro de estudiante?')) {
                    BD_ESTUDIANTES = BD_ESTUDIANTES.filter(est => est.id != id);
                    listarEstudiantes();
                }
            });
        });

        document.querySelectorAll('.btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const est = BD_ESTUDIANTES.find(e => e.id == id);
                if(est) {
                    modalTitulo.textContent = 'Editar Información del Alumno';
                    document.querySelector('#estudianteId').value = est.id;
                    document.querySelector('#codigo').value = est.codigo;
                    document.querySelector('#nombre').value = est.nombre;
                    document.querySelector('#especialidad').value = est.especialidad;
                    document.querySelector('#estado').value = est.estado;
                    modal.classList.add('open');
                }
            });
        });
    }

    // Buscador en tiempo real
    txtBuscar.addEventListener('input', (e) => {
        listarEstudiantes(e.target.value);
    });

    // Abrir/Cerrar Ventana Emergente
    btnAbrirModal.addEventListener('click', () => {
        modalTitulo.textContent = 'Registrar Nuevo Alumno';
        formEstudiante.reset();
        document.querySelector('#estudianteId').value = '';
        modal.classList.add('open');
    });

    function cerrarModalFunc() { modal.classList.remove('open'); }
    btnCerrarModal.addEventListener('click', cerrarModalFunc);

    // Inicializar la tabla al cargar la vista
    listarEstudiantes();
});
