/* ↓↓↓↓↓↓↓↓↓ OBTENCION DE ELEMENTOS ↓↓↓↓↓↓↓↓↓*/
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const lastnameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const cityInput = document.getElementById("city");
const cellphoneInput = document.getElementById("cellphone");
const dateInput = document.getElementById("date");
const libroSelect = document.getElementById("libro");



/* ↓↓↓↓↓↓↓↓↓ SE CREAN MENSAJES DE ERROR  ↓↓↓↓↓↓↓↓↓*/

// Crear elementos para mensajes de error
const nameError = document.createElement("span");
nameError.className = "error-message";
nameInput.after(nameError);

const lastnameError = document.createElement("span");
lastnameError.className = "error-message";
lastnameInput.after(lastnameError);

// Crear elemento para mensaje de error
const emailError = document.createElement("span");
emailError.className = "error-message";
emailInput.after(emailError);

const cityError = document.createElement("span");
cityError.className = "error-message";
cityInput.after(cityError);

const cellphoneError = document.createElement("span");
cellphoneError.className = "error-message";
cellphoneInput.after(cellphoneError);

const dateError = document.createElement("span");
dateError.className = "error-message";
dateInput.after(dateError);

const libroError = document.createElement("span");
libroError.className = "error-message";
libroSelect.after(libroError);

/* ↓↓↓↓↓↓↓↓↓ VALIDACION EN TIEMPO REAL ↓↓↓↓↓↓↓↓↓*/

// Validación en tiempo real: solo letras permitidas
nameInput.addEventListener("input", () => {
    const value = nameInput.value.trim();
    if (value.length < 3) {
        nameError.textContent = "Nombre debe tener al menos 3 letras.";
    }else if (value && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
        nameError.textContent = "Nombre solo puede contener letras.";
    } else {
        nameError.textContent = "";
    }
});

lastnameInput.addEventListener("input", () => {
    const value = lastnameInput.value.trim();
    if (value.length < 3) {
        lastnameError.textContent = "Apellido debe tener al menos 3 letras.";
    } else if (value && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
        lastnameError.textContent = "Apellido solo puede contener letras.";
    } else {
        lastnameError.textContent = "";
    }
});

// Validación en tiempo real para email
emailInput.addEventListener("input", () => {
    const value = emailInput.value.trim();
    // No puede empezar con número
    if (/^\d/.test(value)) {
        emailError.textContent = "El email no puede empezar con un número.";
    }
    // No puede tener espacios
    else if (/\s/.test(value)) {
        emailError.textContent = "El email no puede contener espacios.";
    }
    // Debe tener formato email básico
    else if (value && !/^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        emailError.textContent = "Formato de email inválido.Ej: usuario@ejemplo.com";
    } else {
        emailError.textContent = "";
    }
});

// Validación en tiempo real: solo letras permitidas
cityInput.addEventListener("input", () => {
    const value = cityInput.value.trim();
    if (value && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
        cityError.textContent = "Ciudad solo puede contener letras.";
    } else {
        cityError.textContent = "";
    }
});

// Validación en tiempo real: solo números permitidos
cellphoneInput.addEventListener("input", () => {
    const value = cellphoneInput.value.trim();
    if (value && !/^\d+$/.test(value)) {
        cellphoneError.textContent = "El teléfono solo puede contener números, sin espacios ni símbolos.";
    } else {
        cellphoneError.textContent = "";
    }
});

dateInput.addEventListener("input", () => {
    const value = dateInput.value;
    const today = new Date().toISOString().split("T")[0];
    if (value && value > today) {
        dateError.textContent = "La fecha no puede ser futura.";
    } else {
        dateError.textContent = "";
    }
});

// Validación en tiempo real
libroSelect.addEventListener("input", () => {
    if (libroSelect.value === "") {
        libroError.textContent = "Debes seleccionar una opción.";
    } else {
        libroError.textContent = "";
    }
});

/* ↓↓↓↓↓↓↓↓↓ OCULTAR ERROR AL PERDER FOCO ↓↓↓↓↓↓↓↓↓*/


// Ocultar error al perder el foco
nameInput.addEventListener("blur", () => {
    nameError.textContent = "";
});
lastnameInput.addEventListener("blur", () => {
    lastnameError.textContent = "";
});

// Ocultar error al perder el foco
emailInput.addEventListener("blur", () => {
    emailError.textContent = "";
});

// Ocultar error al perder el foco
cityInput.addEventListener("blur", () => {
    cityError.textContent = "";
});

// Ocultar error al perder el foco
cellphoneInput.addEventListener("blur", () => {
    cellphoneError.textContent = "";
});

dateInput.addEventListener("blur", () => {
    dateError.textContent = "";
});

// Ocultar error al perder el foco
libroSelect.addEventListener("blur", () => {
    libroError.textContent = "";
});

/* ↓↓↓↓↓↓↓↓↓ VALIDACION AL ENVIAR ↓↓↓↓↓↓↓↓↓*/


// Validación al enviar: solo si están vacíos
form.addEventListener("submit", function (e) {
    let valid = true;
    let genderSelected = false;
    if (nameInput.value.trim() === "") {
        nameError.textContent = "El nombre es obligatorio.";
        valid = false;
    }
    if (lastnameInput.value.trim() === "") {
        lastnameError.textContent = "El apellido es obligatorio.";
        valid = false;
    }
    if (emailInput.value.trim() === "") {
        emailError.textContent = "El email es obligatorio.";
        valid = false;
    }
    if (cityInput.value.trim() === "") {
        cityError.textContent = "La ciudad es obligatoria.";
        valid = false;
    }
    if (cellphoneInput.value.trim() === "") {
        cellphoneError.textContent = "El teléfono es obligatorio.";
        valid = false;
    }
    if (dateInput.value === "") {
        dateError.textContent = "La fecha de nacimiento es obligatoria.";
        valid = false;
    }
    if (libroSelect.value === "") {
        libroError.textContent = "Debes seleccionar una opción.";
        valid = false;
    }
    if (!valid) {
        e.preventDefault();
    }else {
        alert("¡El formulario se envió correctamente!");
    }
});