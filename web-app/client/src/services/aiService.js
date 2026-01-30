import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

let model = null;

export const loadModel = async () => {
    if (model) return model;
    console.log("Loading MobileNet model...");
    // Load the model.
    model = await mobilenet.load();
    console.log("Model loaded successfully");
    return model;
};

export const classifyImage = async (imageElement) => {
    if (!model) {
        await loadModel();
    }

    // Classify the image.
    const predictions = await model.classify(imageElement);
    console.log("AI Predictions:", predictions);

    return predictions;
};
