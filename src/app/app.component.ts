import { Component, OnInit } from '@angular/core';
import { TensorflowService } from './services/tensorflow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sentiment Chat';
  constructor(private tf: TensorflowService) { }
  ngOnInit() {
    if (this.tf.getModel() === null) {
      this.loadModel();
    }
  }
  async loadModel() {
    await this.tf.loadModel();
  }
}
