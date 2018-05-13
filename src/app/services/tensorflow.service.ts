import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class TensorflowService {

  urlModel = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json';
  urlMetaData = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json';

  model: tf.Model = null;
  indexFrom: any;
  maxLen: any;
  wordIndex: any;
  prediction: any;

  constructor() { }
  getModel() {
    return this.model;
  }
  async loadModel() {
    this.model = await tf.loadModel(this.urlModel);
    const sentimentMetadata = await this.loadMetadata();
    this.indexFrom = sentimentMetadata['index_from'];
    this.maxLen = sentimentMetadata['max_len'];
    this.wordIndex = sentimentMetadata['word_index'];
  }
  async loadMetadata() {
    const metadataJson = await fetch(this.urlMetaData);
    const metadata = await metadataJson.json();
    return metadata;
  }
  async predict(msg: string) {
    await tf.tidy(() => {
        const inputText = msg.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
        const inputBuffer = tf.buffer([1, this.maxLen], 'float32');
        for (let i = 0; i < inputText.length; ++i) {
          const word = inputText[i];
          inputBuffer.set(this.wordIndex[word] + this.indexFrom, 0, i);
        }
        const input = inputBuffer.toTensor();
        const output = this.model.predict(input) as any;
        this.prediction = Array.from(output.dataSync())[0];
      });
  }

  async getPrediction(msg: string) {
    await this.predict(msg);
    return this.prediction;
  }

}
