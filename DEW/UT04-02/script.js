// Static Selector
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
const rellenarAniosNacimiento = (startYear, endYear) => {
    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        DOM.anioNacimiento.appendChild(option);
    }
};

// Actualizar el campo oculto de aficiones
const updateAficiones = () => {
    const selected = Array.from(DOM.checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    DOM.aficiones.value = selected.join(', ');
    DOM.aficiones.setCustomValidity(
        selected.length >= 2
            ? '' // Correcto
            : 'Debes seleccionar al menos dos aficiones.' // Mensaje de error claro
    );
};

// Actualizar los mensajes de validación
const updateValidationMessages = () => {
    updateAficiones(); // Validar aficiones primero

    DOM.validationMessages.innerHTML = ''; // Limpiar mensajes
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

// Mostrar/Ocultar contraseña
const togglePasswordVisibility = () => {
    DOM.password.type = DOM.showPassword.checked ? 'text' : 'password';
};

// Validar DNI/NIE según el tipo de documento
const handleTipoDocumentoChange = () => {
    const tipoDocumento = DOM.tipoDocumento.value;
    if (tipoDocumento === 'DNI') {
        DOM.dni.pattern = '\\d{8}[A-Za-z]';
        DOM.dni.setCustomValidity('');
        DOM.dni.placeholder = '12345678A';
    } else if (tipoDocumento === 'NIE') {
        DOM.dni.pattern = '[XYZxyz]\\d{7}[A-Za-z]';
        DOM.dni.setCustomValidity('');
        DOM.dni.placeholder = 'X1234567A';
    } else {
        DOM.dni.setCustomValidity('Selecciona un tipo de documento.');
    }
};

// Actualizar contadores de caracteres
const updateContadoresCaracteres = () => {
    DOM.tituloCounter.textContent = `${DOM.titulo.value.length} / 15`;
    DOM.descripcionCounter.textContent = `${DOM.descripcion.value.length} / 120`;
};

// Inicializar el formulario
document.addEventListener('DOMContentLoaded', () => {
    // Rellenar años de nacimiento
    rellenarAniosNacimiento(1920, 2010);

    // Mostrar/Ocultar contraseña
    DOM.showPassword.addEventListener('change', togglePasswordVisibility);

    // Validar DNI/NIE según el tipo de documento
    DOM.tipoDocumento.addEventListener('change', handleTipoDocumentoChange);

    // Actualizar contadores de caracteres
    DOM.titulo.addEventListener('input', updateContadoresCaracteres);
    DOM.descripcion.addEventListener('input', updateContadoresCaracteres);

    // Escuchar cambios en las casillas de verificación
    DOM.checkboxes.forEach(checkbox =>
        checkbox.addEventListener('change', updateValidationMessages)
    );

    // Validar el formulario al enviar
    DOM.form.addEventListener('submit', (event) => {
        updateAficiones(); // Validar las aficiones

        if (!DOM.form.checkValidity()) {
            event.preventDefault(); // Evitar envío si hay errores
            updateValidationMessages(); // Mostrar mensajes
        }
    });

    // Escuchar eventos de entrada para validar
    DOM.form.addEventListener('input', updateValidationMessages);
});
