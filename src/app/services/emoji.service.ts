import { Injectable } from '@angular/core';

@Injectable()
export class EmojiService {

  constructor() { }
  getEmojiLabel(scoreInt: number) {
    if (scoreInt >= 0 && scoreInt <= 10) {
      return 'angry';
    }
    if (scoreInt >= 11 && scoreInt <= 30) {
      return 'sad';
    }
    if (scoreInt >= 31 && scoreInt <= 40) {
      return 'disgust';
    }
    if (scoreInt >= 41 && scoreInt <= 70) {
      return 'surprise';
    }
    if (scoreInt >= 71 && scoreInt <= 90) {
      return 'happy';
    }
    if (scoreInt >= 91) {
      return 'joy';
    }
  }

}
