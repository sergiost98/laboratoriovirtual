function setGateType(type) {
    gateType = type;
    const gateElement = document.getElementById('gate');
    const inputsContainer = document.getElementById('inputs');
    gateElement.innerHTML = '';
    inputsContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = `images/${type.toLowerCase()}.png`; // Suponemos que las imágenes están en la carpeta 'images' y son 'and.png', 'or.png', 'not.png'
    img.alt = type + ' Gate';
    gateElement.appendChild(img);

    updateInputs(type);
}

function updateInputs(type) {
    const inputsContainer = document.getElementById('inputs');
    if (type === 'NOT') {
        inputsContainer.innerHTML = '<label>A: <input type="checkbox" id="inputA" onclick="updateOutput()" value="0"><span id="inputAValue">0</span></label>';
    } else {
        inputsContainer.innerHTML = `
            <label>A: <input type="checkbox" id="inputA" onclick="updateOutput()" value="0"><span id="inputAValue">0</span></label>
            <label>B: <input type="checkbox" id="inputB" onclick="updateOutput()" value="0"><span id="inputBValue">0</span></label>
        `;
    }
    updateOutput();
}

function updateOutput() {
    const outputContainer = document.getElementById('output');
    let result;
    const inputA = document.getElementById('inputA').checked ? 1 : 0;
    const inputB = document.getElementById('inputB')?.checked ? 1 : 0;

    document.getElementById('inputAValue').textContent = inputA;
    if (document.getElementById('inputBValue')) {
        document.getElementById('inputBValue').textContent = inputB;
    }

    if (gateType === 'AND') {
        result = inputA && inputB;
    } else if (gateType === 'OR') {
        result = inputA || inputB;
    } else if (gateType === 'NOT') {
        result = inputA ? 0 : 1;
    }

    outputContainer.textContent = 'Output: ' + result;
}