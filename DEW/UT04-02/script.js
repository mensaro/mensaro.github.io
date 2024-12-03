// Actualizar el contador de caracteres en los campos PublicacionTitulo y PublicacionDescripcion
function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId); // Campo input/textarea
    const counter = document.getElementById(`${fieldId}-counter`); // Contador asociado
    const currentLength = field.value.length; // Longitud actual del texto ingresado
    counter.textContent = `${currentLength} / ${maxLength}`; // Mostrar "actual / máximo"

    // Verificar si el contenido es válido
    if (field.validity.valid) {
        field.style.borderColor = "green"; // Borde verde si es válido
    } else {
        field.style.borderColor = "red"; // Borde rojo si es inválido
    }
}

// Mostrar/ocultar contraseña en el campo Contrasena
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password'); // Campo de contraseña
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Cambiar a texto para mostrar la contraseña
    } else {
        passwordField.type = 'password'; // Cambiar a contraseña para ocultarla
    }
}

// Validar si se seleccionaron al menos 2 aficiones
function validateCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="Aficiones[]"]:checked'); // Aficiones seleccionadas
    if (checkboxes.length < 2) {
        alert('Debe seleccionar al menos dos aficiones.'); // Mostrar alerta si no se cumplen los requisitos
        return false; // Impedir el envío del formulario
    }
    return true; // Permitir el envío del formulario
}

// Añadir gestión de validationMessage en tiempo real
document.querySelectorAll('input, textarea, select').forEach((field) => {
    field.addEventListener('input', () => {
        const errorMessageElement = field.nextElementSibling; // El siguiente elemento al campo (error-message)
        if (field.validity.valid) {
            field.style.borderColor = "green"; // Borde verde si es válido
            if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
                errorMessageElement.textContent = ""; // Vaciar mensaje de error si el campo es válido
            }
        } else {
            field.style.borderColor = "red"; // Borde rojo si es inválido
            if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
                errorMessageElement.textContent = field.validationMessage; // Mostrar mensaje de error del navegador
            }
        }
    });
});


// Mostrar los mensajes de validación en tiempo real
document.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => {
        const validationMessages = document.getElementById('validation-messages');
        validationMessages.innerHTML = ''; // Limpiar los mensajes previos

        document.querySelectorAll('input, select, textarea').forEach((input) => {
            if (!input.validity.valid) {
                const message = document.createElement('li');
                message.textContent = `${input.name}: ${input.validationMessage}`;
                validationMessages.appendChild(message);
            }
        });
    });
});
