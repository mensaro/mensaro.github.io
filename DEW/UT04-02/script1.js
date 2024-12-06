document.addEventListener('DOMContentLoaded', () => {
    const DOM = {
        form: document.getElementById('registro-form'),
        inputs: document.querySelectorAll('input, select, textarea'),
        validationMessages: document.getElementById('validation-messages'),
        password: document.getElementById('password'),
        showPassword: document.getElementById('show-password'),
        titulo: document.getElementById('titulo'),
        descripcion: document.getElementById('descripcion'),
        tituloCounter: document.getElementById('titulo-counter'),
        descripcionCounter: document.getElementById('descripcion-counter'),
        aficiones: document.getElementById('aficiones'),
        checkboxes: document.querySelectorAll('fieldset.checkbox-block input[type="checkbox"]'),
        tipoDocumento: document.getElementById('tipo_documento'),
        dni: document.getElementById('dni'),
        anioNacimiento: document.getElementById('anio_nacimiento'),
        aficionesBlock: document.querySelector('.checkbox-block'),
    };

    // Rellenar el selector de año de nacimiento
    for (let year = 1920; year <= 2010; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        DOM.anioNacimiento.appendChild(option);
    }

    // Mostrar/Ocultar contraseña
    DOM.showPassword.addEventListener('change', () => {
        DOM.password.type = DOM.showPassword.checked ? 'text' : 'password';
    });

    // Actualizar el campo oculto de aficiones
    const updateAficiones = () => {
        const selected = Array.from(DOM.checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        DOM.aficiones.value = selected.join(', ');
        // Validación personalizada: al menos 2 opciones seleccionadas
        DOM.aficiones.setCustomValidity(
            selected.length >= 2
                ? '' // Correcto
                : 'Selecciona al menos dos aficiones.' // Mensaje de error
        );
    };

    // Validar DNI/NIE según el tipo de documento
    DOM.tipoDocumento.addEventListener('change', () => {
        const tipoDocumento = DOM.tipoDocumento.value;
        if (tipoDocumento === 'DNI') {
            DOM.dni.pattern = '\\d{8}[A-Za-z]';
            DOM.dni.placeholder = '12345678A';
        } else if (tipoDocumento === 'NIE') {
            DOM.dni.pattern = '[XYZxyz]\\d{7}[A-Za-z]';
            DOM.dni.placeholder = 'X1234567A';
        }
    });

    // Actualizar contadores de caracteres
    DOM.titulo.addEventListener('input', () => {
        DOM.tituloCounter.textContent = `${DOM.titulo.value.length} / 15`;
    });

    DOM.descripcion.addEventListener('input', () => {
        DOM.descripcionCounter.textContent = `${DOM.descripcion.value.length} / 120`;
    });

    const updateValidationMessages = () => {
        updateAficiones(); // Asegurarse de que las aficiones estén actualizadas

        DOM.validationMessages.innerHTML = ''; // Limpiar mensajes existentes
        DOM.inputs.forEach(element => {
            if (element.name) {
                element.checkValidity(); // Verificar la validez del elemento
                const li = document.createElement('li');
                li.textContent = element.validationMessage
                    ? `${element.name}: ${element.validationMessage}` // Mostrar mensaje de error
                    : `${element.name}: Correcto`; // Mostrar mensaje de éxito
                DOM.validationMessages.appendChild(li);
            }
        });
    };

    // Escuchar cambios en las casillas de verificación
    DOM.checkboxes.forEach(checkbox =>
        checkbox.addEventListener('change', () => {
            updateValidationMessages(); // Actualizar mensajes dinámicos
        })
    );

    // Validar el formulario al enviar
    DOM.form.addEventListener('submit', (event) => {
        updateAficiones(); // Asegurarse de que las aficiones estén validadas correctamente

        if (!DOM.form.checkValidity()) {
            event.preventDefault(); // Evitar el envío si hay errores de validación
            updateValidationMessages(); // Actualizar mensajes si hay errores
        }
        // Si el formulario es válido, permitirá la redirección al action definido en el HTML
    });

    // Escuchar eventos de entrada para actualizar mensajes
    DOM.form.addEventListener('input', updateValidationMessages);
});
