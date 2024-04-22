// Función para cargar y clasificar frases de toxicidad
async function classifyToxicity(phrase, threshold) {
    try {
        // Cargar el modelo de toxicidad con el umbral especificado
        const model = await toxicity.load(threshold);

        // Clasificar la frase utilizando el modelo cargado
        const predictions = await model.classify(phrase);

        // Devolver las predicciones clasificadas
        return predictions;
    } catch (error) {
        console.error('Error al cargar o clasificar con el modelo de toxicidad:', error);
        throw error; // Lanzar el error para manejo externo si es necesario
    }
}

// Función para mostrar las predicciones en la vista HTML
function displayPredictions(predictions) {
    const predictionsList = document.getElementById('predictionsList');
    predictionsList.innerHTML = ''; // Limpiar contenido previo

    predictions.forEach(prediction => {
        const label = prediction.label;
        const match = prediction.results[0].match;

        const listItem = document.createElement('div');
        listItem.textContent = `${label}: ${match ? 'Sí' : 'No'}`;

        predictionsList.appendChild(listItem);
    });

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block'; // Mostrar contenedor de resultados
}

// Función principal para clasificar y mostrar las predicciones
async function classifyAndDisplay() {
    const umbral = 0.1; // Umbral de confianza mínimo
    const phraseInput = document.getElementById('phraseInput');
    const phrase = phraseInput.value.trim();

    try {
        // Clasificar la frase ingresada
        const predictions = await classifyToxicity(phrase, umbral);

        // Mostrar las predicciones en la vista HTML
        displayPredictions(predictions);
    } catch (error) {
        console.error('Error al clasificar la frase:', error);
        alert('Error al analizar la toxicidad de la frase. Por favor, intenta nuevamente.');
    }
}
