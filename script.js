// Sliders
const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const azul = document.getElementById("azul");

// Inputs numéricos
const rojoInput = document.getElementById("rojoInput");
const verdeInput = document.getElementById("verdeInput");
const azulInput = document.getElementById("azulInput");

// Input color picker
const colorPicker = document.getElementById("colorPicker");

// Elementos de salida
const colorBox = document.getElementById("color-box");
const hexCode = document.getElementById("hex-code");
const rgbCode = document.getElementById("rgb-code");
const copyBtn = document.getElementById("copyBtn");

// Función para actualizar color desde sliders/inputs
function actualizarColor() {
  const r = parseInt(rojo.value);
  const g = parseInt(verde.value);
  const b = parseInt(azul.value);

  rojoInput.value = r;
  verdeInput.value = g;
  azulInput.value = b;

  const rgb = `rgb(${r}, ${g}, ${b})`;
  colorBox.style.backgroundColor = rgb;

  const hex = "#" + [r, g, b]
    .map(v => v.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  hexCode.textContent = hex;
  rgbCode.textContent = rgb;

  colorPicker.value = hex;
}

// Función desde inputs numéricos
function actualizarDesdeInputs() {
  rojo.value = Math.min(255, Math.max(0, rojoInput.value || 0));
  verde.value = Math.min(255, Math.max(0, verdeInput.value || 0));
  azul.value = Math.min(255, Math.max(0, azulInput.value || 0));
  actualizarColor();
}

// Función desde picker
function actualizarDesdePicker() {
  const hex = colorPicker.value;
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  rojo.value = r;
  verde.value = g;
  azul.value = b;
  rojoInput.value = r;
  verdeInput.value = g;
  azulInput.value = b;

  actualizarColor();
}

// Copiar HEX al portapapeles
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(hexCode.textContent).then(() => {
    copyBtn.textContent = "✅ Copiado";
    setTimeout(() => (copyBtn.textContent = "📋 Copiar Hex"), 2000);
  });
});

// Eventos
rojo.addEventListener("input", actualizarColor);
verde.addEventListener("input", actualizarColor);
azul.addEventListener("input", actualizarColor);

rojoInput.addEventListener("input", actualizarDesdeInputs);
verdeInput.addEventListener("input", actualizarDesdeInputs);
azulInput.addEventListener("input", actualizarDesdeInputs);

colorPicker.addEventListener("input", actualizarDesdePicker);

// Inicializar
actualizarColor();