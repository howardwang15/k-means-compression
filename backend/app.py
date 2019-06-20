from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
import io
from Kmeans import compress_image, resize

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
@cross_origin(origin='localhost')
def handle_upload():
    image = request.files['file']
    data = io.BytesIO(image.read())
    data = data.read()
    compressed_buffer = compress_image(image.filename, data)
    return make_response(compressed_buffer.tobytes())

@app.route('/resize', methods=['POST'])
def resize_upload():
    image = request.files['file']
    data = io.BytesIO(image.read())
    data = data.read()
    resized = resize(image.filename, data)
    return make_response(resized.tobytes())