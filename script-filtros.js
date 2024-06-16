function calcularFrecuenciaCorte() {
    var R = parseFloat(document.getElementById("resistencia").value);
    var C = parseFloat(document.getElementById("capacitancia").value) * 1e-9;
    var fc = 0;

    if (!isNaN(R) && !isNaN(C) && R > 0 && C > 0) {
        fc = 1 / (2 * Math.PI * R * C);
        document.getElementById("resultadoPB").innerHTML = "La frecuencia de corte es: " + fc.toFixed(2) + " Hz";
    } else {
        document.getElementById("resultadoPB").innerHTML = "Ingresa valores válidos para la resistencia y la capacitancia.";
    }
}

// Función para calcular la frecuencia de corte de un filtro pasa altas
function calcularFrecuenciaCortePasaAltas() {
    var R = parseFloat(document.getElementById("resistenciaPA").value);
    var C = parseFloat(document.getElementById("capacitanciaPA").value) * 1e-9;
    var fc = 0;

    if (!isNaN(R) && !isNaN(C) && R > 0 && C > 0) {
        fc = 1 / (2 * Math.PI * R * C);
        document.getElementById("resultadoPA").innerHTML = "La frecuencia de corte es: " + fc.toFixed(2) + " Hz";
    } else {
        document.getElementById("resultadoPA").innerHTML = "Ingresa valores válidos para la resistencia y la capacitancia.";
    }
}

// Función para calcular la frecuencia de corte de un filtro pasa banda
function calcularFrecuenciaCortePasaBanda() {
    var R1 = parseFloat(document.getElementById("resistenciaPB1").value);
    var R2 = parseFloat(document.getElementById("resistenciaPB2").value);
    var C1 = parseFloat(document.getElementById("capacitanciaPB1").value) * 1e-9;
    var C2 = parseFloat(document.getElementById("capacitanciaPB2").value) * 1e-9;
    var fc1 = 0;
    var fc2 = 0;

    if (!isNaN(R1) && !isNaN(R2) && !isNaN(C1) && !isNaN(C2) && R1 > 0 && R2 > 0 && C1 > 0 && C2 > 0) {
        fc2 = 1 / (2 * Math.PI * R1 * C1);
        fc1 = 1 / (2 * Math.PI * R2 * C2);
        document.getElementById("resultadoPB1").innerHTML = "La frecuencia de corte inferior es: " + fc1.toFixed(2) + " Hz<br>La frecuencia de corte superior es: " + fc2.toFixed(2) + " Hz";
    } else {
        document.getElementById("resultadoPB1").innerHTML = "Ingresa valores válidos para las resistencias y las capacitancias.";
    }
}

