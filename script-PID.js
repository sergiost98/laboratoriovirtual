let kp = parseFloat(document.getElementById('kp').value);
let ki = parseFloat(document.getElementById('ki').value);
let kd = parseFloat(document.getElementById('kd').value);
let Setpoint = parseFloat(document.getElementById('Setpoint').value);

// Variable para controlar la simulación
let simulationRunning = false;
let pidController;
let intervalId;
let time = 0;
let systemOutput = 0;

// Configuración del gráfico
const ctx = document.getElementById('pid-chart').getContext('2d');
const GraficoPID = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
        {
            label: 'Salida del PID',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [],
            fill: false,
            pointRadius: 0
        },
        {
            label: 'Setpoint',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false,
            pointRadius: 0
        }
      ]
    },
    options: {
        scales: {
            x: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

// Agrega manejadores de eventos a los campos de entrada
document.getElementById('kp').addEventListener('input', updatePID);
document.getElementById('ki').addEventListener('input', updatePID);
document.getElementById('kd').addEventListener('input', updatePID);
document.getElementById('Setpoint').addEventListener('input', updatePID);

// Función para actualizar el PID al modificar los valores de entrada
function updatePID() {
    // Actualiza los valores de los coeficientes PID
    kp = parseFloat(document.getElementById('kp').value);
    ki = parseFloat(document.getElementById('ki').value);
    kd = parseFloat(document.getElementById('kd').value);
    Setpoint = parseFloat(document.getElementById('Setpoint').value);

    pidController = new PIDController(kp, ki, kd);
}

// Función para iniciar la simulación
function startSimulation() {
    if (!simulationRunning) {
        simulationRunning = true;
        pidController = new PIDController(kp, ki, kd);  // Asegúrate de que el controlador esté actualizado
        resetGraph();
        intervalId = setInterval(updateGraph, 50);
    }
}

  // Función para detener la simulación
function stopSimulation() {
    simulationRunning = false;
    clearInterval(intervalId);
}

// Función para resetear la gráfica
function resetGraph() {
    GraficoPID.data.labels = [];
    GraficoPID.data.datasets[0].data = [];
    GraficoPID.data.datasets[1].data = [];
    GraficoPID.update();
    time = 0;
    systemOutput = 0;
}

class PIDController {
    constructor(Kp, Ki, Kd) {
        this.Kp = Kp;
        this.Ki = Ki;
        this.Kd = Kd;
        this.integral = 0;
        this.previousError = 0;
    }

    calculate(Setpoint, systemOutput, dt) {
        let error = Setpoint - systemOutput;
        this.integral += error * dt;
        let derivative = (error - this.previousError) / dt;
        let output = this.Kp * error + this.Ki * this.integral + this.Kd * derivative;
        this.previousError = error;
        return output;
    }
}


// Simula un proceso y actualiza la gráfica
function updateGraph() {
    if (!simulationRunning) {
        return; // Detener la simulación
    }

    // Aquí implementarías la lógica de tu controlador PID y obtendrías la salida
    // En este ejemplo, se utiliza una función seno como entrada
    const dt = 0.1;
    const totalTime = 15;
    const tau = 1;   // Constante de tiempo del sistema
    const K = 1;     // Ganancia del sistema    
    const zeta = 1.3;

    let timeData = [];
    let outputData = [];
    let setpointData = [];

    let controlSignal = pidController.calculate(Setpoint, systemOutput, dt);
    
    //Parámetros del sistema
    const omega_n = 1 / tau;

    //systemOutput += (K * controlSignal / omega_n) * (1 + zeta * omega_n * time) * Math.exp(-zeta * omega_n * time);

    // Simulación del sistema sobreamortiguado
    const exp1 = Math.exp((-zeta + Math.sqrt(zeta * zeta - 1)) * omega_n * time);
    const exp2 = Math.exp((-zeta - Math.sqrt(zeta * zeta - 1)) * omega_n * time);
    systemOutput = K * controlSignal * (1 - (1 / (2 * Math.sqrt(zeta * zeta - 1))) * (exp1 + exp2));
    

    time += dt;

    GraficoPID.data.labels.push(time);
    GraficoPID.data.datasets[0].data.push(systemOutput);
    GraficoPID.data.datasets[1].data.push(Setpoint);

    console.log('Input:', controlSignal);
    console.log('Output:', systemOutput);
  
    
    // Actualiza la leyenda de la gráfica
    GraficoPID.options.plugins.legend.display = true;
    GraficoPID.options.plugins.legend.position = 'top';
    GraficoPID.options.plugins.legend.labels = {
      fontColor: 'black',
      fontSize: 14,
      boxWidth: 20
    };

    // Actualiza las etiquetas de la leyenda
    GraficoPID.data.datasets[0].label = `Salida PID (Kp: ${kp}, Ki: ${ki}, Kd: ${kd})`;
    GraficoPID.data.datasets[1].label = 'Setpoint';

    // Actualiza la gráfica
    GraficoPID.update();
  
    if (time >= totalTime) {
        stopSimulation();
    }
}

