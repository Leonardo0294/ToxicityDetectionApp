// Script para realizar el análisis de toxicidad utilizando el Modelo de Toxicidad de TensorFlow.js

const text = document.getElementById('text');
const button = document.getElementById('analyze');
const loader = document.getElementById('loader');
const resultsContainer = document.getElementById('results-container');

const threshold = 0.9;

async function analyzeToxicity(texto) {
    const model = await toxicity.load(threshold);
    const predictions = await model.classify([texto]);
    return predictions;
}

button.addEventListener('click', async () => {
    if (!text.value) {
        alert('Por favor, ingrese un texto');
        return;
    }

    button.disabled = true;
    button.textContent = 'Analizando...';
    loader.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';

    const texto = text.value;
    const result = await analyzeToxicity(texto);

    loader.innerHTML = '';
    button.disabled = false;
    button.textContent = 'Analizar';

    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    result.forEach((prediction) => {
        const label = prediction.label;
        const isToxic = prediction.results[0].match;
        const probability = (prediction.results[0].probabilities[1] * 100).toFixed(2);

        // Crear elementos HTML para mostrar resultados
        const resultElement = document.createElement('div');
        resultElement.classList.add('result-item');

        const labelElement = document.createElement('p');
        labelElement.textContent = `Label: ${label}`;

        const isToxicElement = document.createElement('p');
        isToxicElement.textContent = `Es tóxico: ${isToxic ? 'Sí' : 'No'}`;

        const probabilityElement = document.createElement('p');
        probabilityElement.textContent = `Probabilidad: ${probability}%`;

        // Agregar elementos al contenedor de resultados
        resultElement.appendChild(labelElement);
        resultElement.appendChild(isToxicElement);
        resultElement.appendChild(probabilityElement);

        resultsContainer.appendChild(resultElement); // Agregar resultado al contenedor
    });

    // Imprimir predicciones en formato JSON en la consola
    console.log(JSON.stringify(result, null, 2));
});
