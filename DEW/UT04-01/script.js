function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId);// Obtiene el campo (input/textarea) por su ID.
    const counter = document.getElementById(`${fieldId}-counter`);// Obtiene el elemento del contador asociado por su ID.
    const currentLength = field.value.length;// Calcula la longitud actual del texto ingresado en el campo.
    counter.textContent = `${currentLength} / ${maxLength}`;// Actualiza el contenido del contador con el formato: "actual / máximo".
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password'); // Obtiene el campo de contraseña por su ID.
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Cambia el tipo del input a "text" para mostrar la contraseña.
    } else {
        passwordField.type = 'password'; // Cambia el tipo del input a "password" para ocultar la contraseña.
    }
}