import { Component, OnInit } from '@angular/core';
import { TensorflowService } from './services/tensorflow.service';
import { EmojiService } from './services/emoji.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sentiment Chat';
  mainEmoji: string;
  constructor(private tf: TensorflowService, private emoji: EmojiService) {
    this.mainEmoji = this.emoji.getMainEmoji();
  }
  ngOnInit() {
    if (this.tf.getModel() === null) {
      this.loadModel();
    }
  }
  async loadModel() {
    await this.tf.loadModel();
  }
}
