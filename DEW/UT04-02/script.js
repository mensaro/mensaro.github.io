// ***** Selección de elementos del DOM *****
/*const DOM = {
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

// ***** Funciones *****

// Mostrar/ocultar contraseña
const togglePasswordVisibility = () => {
    DOM.password.type = DOM.password.type === 'password' ? 'text' : 'password';
};

// Contador de caracteres
const updateCounter = (field, counter, maxLength) => {
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
    field.style.borderColor = field.validity.valid ? "black" : "red";
};

// Validar checkbox de aficiones
const validateCheckboxes = () => {
    const selectedCheckboxes = Array.from(DOM.checkboxes).filter(checkbox => checkbox.checked);

    if (selectedCheckboxes.length < 2) {
        DOM.aficiones.setCustomValidity("Por favor selecciona al menos dos aficiones.");
        return false;
    }

    const selectedValues = selectedCheckboxes.map(checkbox => checkbox.value.toUpperCase().substring(0, 2));
    DOM.aficiones.value = selectedValues.join(', ');
    DOM.aficiones.setCustomValidity("");
    return true;
};

// Actualizar validación del documento (DNI/NIE)
const updateValidation = () => {
    const tipoDocumento = DOM.tipoDocumento.value;

    if (tipoDocumento === 'DNI') {
        DOM.dni.pattern = "^[0-9]{8}[A-Za-z]$";
        DOM.dni.title = "Debe ser un DNI válido: 8 números seguidos de una letra.";
        DOM.dni.placeholder = "Formato: 12345678A";
    } else if (tipoDocumento === 'NIE') {
        DOM.dni.pattern = "^[XYZ][0-9]{7}[A-Za-z]$";
        DOM.dni.title = "Debe ser un NIE válido: Comienza con X, Y o Z, seguido de 7 números y una letra.";
        DOM.dni.placeholder = "Formato: X1234567L";
    } else {
        DOM.dni.removeAttribute("pattern");
        DOM.dni.title = "Seleccione un tipo de documento.";
        DOM.dni.placeholder = "DNI / NIE";
    }
    DOM.dni.setCustomValidity("");
};

// Mostrar mensajes de validación globales
const showGlobalValidationMessages = () => {
    DOM.validationMessages.innerHTML = ''; // Limpiar mensajes previos

    DOM.inputs.forEach((field) => {
        const message = field.validationMessage;
        const name = field.name;

        if (message) {
            const listItem = document.createElement('li');
            listItem.textContent = `${name}: ${message}`;
            DOM.validationMessages.appendChild(listItem);
        }
    });
};

// Generar opciones para el campo "Año de Nacimiento"
const generateAnioNacimientoOptions = () => {
    const fragment = document.createDocumentFragment();
    for (let year = 2010; year >= 1920; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        fragment.appendChild(option);
    }
    DOM.anioNacimiento.appendChild(fragment);
};

// Configurar validación dinámica
const setupValidationListeners = () => {
    DOM.inputs.forEach((field) => {
        field.addEventListener('input', () => {
            const errorMessageElement = field.nextElementSibling;
            errorMessageElement.textContent = field.validationMessage;

            if (field.validity.valid) {
                field.style.borderColor = "black";
                errorMessageElement.textContent = "";
            } else {
                field.style.borderColor = "red";
            }

            showGlobalValidationMessages(); // Actualiza mensajes globales en tiempo real
        });

        if (field.type === 'checkbox') {
            field.addEventListener('change', validateCheckboxes);
        }
    });
};

// Monitorear cambios en el bloque de aficiones
const monitorAficionesBlock = () => {
    if (DOM.aficionesBlock.style.display === 'none' || DOM.aficionesBlock.offsetParent === null) {
        DOM.aficionesBlock.style.display = 'block';
        DOM.aficionesBlock.style.visibility = 'visible';
    }
};

// Observador para detectar cambios en el DOM
const observeDOMChanges = () => {
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                monitorAficionesBlock();
            }
        }
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
};

// ***** Inicialización *****
document.addEventListener('DOMContentLoaded', () => {
    // Generar dinámicamente las opciones del campo "Año de Nacimiento"
    generateAnioNacimientoOptions();

    // Mostrar/Ocultar contraseña
    DOM.showPassword.addEventListener('click', togglePasswordVisibility);

    // Contadores dinámicos
    DOM.titulo.addEventListener('input', () => updateCounter(DOM.titulo, DOM.tituloCounter, 15));
    DOM.descripcion.addEventListener('input', () => updateCounter(DOM.descripcion, DOM.descripcionCounter, 120));

    // Validación del formulario al enviarlo
    DOM.form.addEventListener('submit', (event) => {
        const isValid = validateCheckboxes();
        showGlobalValidationMessages();

        if (!isValid || !DOM.form.checkValidity()) {
            event.preventDefault();
        }
    });

    // Validación del tipo de documento
    DOM.tipoDocumento.addEventListener('change', updateValidation);

    // Configuración de validadores dinámicos
    setupValidationListeners();

    // Observador de cambios en el DOM
    observeDOMChanges();
});*/


const DOM = {
    anioNacimiento: document.getElementById('anio_nacimiento'),
}

// Generar opciones para el campo "Año de Nacimiento"
const generateAnioNacimientoOptions = () => {
    const fragment = document.createDocumentFragment();
    for (let year = 2010; year >= 1920; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        fragment.appendChild(option);
    }
    DOM.anioNacimiento.appendChild(fragment);
};