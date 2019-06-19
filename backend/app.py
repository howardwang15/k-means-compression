from flask import Flask, request
from flask_cors import CORS, cross_origin
import io
from Kmeans import compress_image

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
@cross_origin(origin='localhost')
def handle_upload():
    image = request.files['file']
    data = io.BytesIO(image.read())
    data = data.read()
    image = compress_image(image.filename, data)
    return 'Hello world'