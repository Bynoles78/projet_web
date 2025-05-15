  function appendValue(val) {
    const display = document.getElementById('calc-display');
    display.value += val;
  }

  function clearDisplay() {
    document.getElementById('calc-display').value = '';
  }

  function calculate() {
    const display = document.getElementById('calc-display');
    try {
      display.value = eval(display.value);
    }
    catch {
      display.value = 'Erreur';
    }
  }
        
let angle = 0;
function rotateImage() {
    const image = document.getElementsByClassName("pdp"); // Cible l'image par son id
    angle += 100; // Incrémente l'angle
    image.style.transform = `rotate(${angle}deg)`; 
    requestAnimationFrame(rotateImage); // Animation fluide
}
rotateImage(); // Lance l'animation