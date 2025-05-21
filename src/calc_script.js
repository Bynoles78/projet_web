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