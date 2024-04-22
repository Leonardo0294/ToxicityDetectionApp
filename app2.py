import requests

# Definir la URL base de la Perspective API
PERSPECTIVE_API_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze'

# Definir tu nueva clave de API de la Perspective API
API_KEY = 'tu_nueva_clave_de_api'

# Función para analizar texto utilizando la Perspective API
def analyze_text(text):
    # Parámetros de la solicitud HTTP
    params = {
        'key': API_KEY
    }

    # Cuerpo de la solicitud HTTP (comentario a analizar)
    data = {
        'comment': {'text': text},
        'requestedAttributes': {'TOXICITY': {}}
    }

    # Realizar la solicitud POST a la Perspective API
    response = requests.post(PERSPECTIVE_API_URL, params=params, json=data)

    # Procesar la respuesta JSON
    if response.status_code == 200:
        result = response.json()
        toxicity_score = result['attributeScores']['TOXICITY']['summaryScore']['value']
        return toxicity_score
    else:
        raise Exception(f"Error al analizar el texto: {response.text}")

# Ejemplo de uso
input_text = "This is a harmless comment."
toxicity_score = analyze_text(input_text)
print(f"Probabilidad de Toxicidad: {toxicity_score}")
