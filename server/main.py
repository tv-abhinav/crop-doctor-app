import os
import os.path as osp
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
import onnxruntime as ort
from torchvision import transforms

app = Flask(__name__)

# Load the SavedModel
ort_sess = ort.InferenceSession('SFMDNet-Model\ensemble.onnx')

IDX_TO_CLASS = {
    0: "Apple Scab Leaf",
    1: "Apple leaf",
    2: "Apple rust leaf",
    3: "Bell_pepper leaf",
    4: "Bell_pepper leaf spot",
    5: "Blueberry leaf",
    6: "Cherry leaf",
    7: "Corn Gray leaf spot",
    8: "Corn leaf blight",
    9: "Corn rust leaf",
    10: "Peach leaf",
    11: "Potato leaf early blight",
    12: "Potato leaf late blight",
    13: "Raspberry leaf",
    14: "Soyabean leaf",
    15: "Squash Powdery mildew leaf",
    16: "Strawberry leaf",
    17: "Tomato Early blight leaf",
    18: "Tomato Septoria leaf spot",
    19: "Tomato leaf",
    20: "Tomato leaf bacterial spot",
    21: "Tomato leaf late blight",
    22: "Tomato leaf mosaic virus",
    23: "Tomato leaf yellow virus",
    24: "Tomato mold leaf",
    25: "grape leaf",
    26: "grape leaf black rot",
}

data_transforms = [transforms.Compose([transforms.Resize((256, 256)),
                   transforms.ToTensor(),
                   transforms.Normalize(mean=[0.469, 0.536, 0.369],
                   std=[0.260, 0.244, 0.282])]),
                   
                   transforms.Compose([transforms.Resize((224, 224)),
                   transforms.ToTensor(),
                   transforms.Normalize(mean=[0.469, 0.536, 0.369],
                   std=[0.260, 0.244, 0.282])])]

# Preprocess image function
def preprocess_image(img_path):
    image = Image.open(img_path).convert('RGB')

    im1 = data_transforms[0](image).unsqueeze(0)
    im2 = data_transforms[1](image).unsqueeze(0)
    return {'input1': im1.numpy(), 'input2': im2.numpy()}

# Predict route
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Save the uploaded file
    file_path = 'leaf_image.jpeg'
    file.save(file_path)

    # Preprocess the image
    input_data = preprocess_image(file_path)

    # Perform inference
    output = ort_sess.run(None, input_data)
    y_pred = np.argmax(output)
    prediction = IDX_TO_CLASS[y_pred]

    # Delete the temporary image file
    # os.remove(file_path)

    # Return the prediction    
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
