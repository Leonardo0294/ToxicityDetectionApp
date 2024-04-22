from flask import Flask, render_template, request
from google_perspectiveapi import PerspectiveAPI

app = Flask(__name__)
api = PerspectiveAPI(api_key='tu_clave_de_api')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if request.method == 'POST':
        text = request.form['text']
        try:
            analysis = api.analyze(comment=text, attributes=['TOXICITY'])
            toxicity_score = analysis['TOXICITY'].summary_score.value
            return render_template('result.html', toxicity_score=toxicity_score)
        except Exception as e:
            return render_template('error.html', error_message=str(e))

if __name__ == '__main__':
    app.run(debug=True)
