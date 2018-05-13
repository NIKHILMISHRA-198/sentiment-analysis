import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { EmojiService } from '../services/emoji.service';
import { TensorflowService } from '../services/tensorflow.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit, AfterViewInit {
  message: string;
  strength = 0;
  userId: string;

  constructor(private chat: ChatService, private tf: TensorflowService, private authService: AuthService, private emoji: EmojiService) {
    authService.authUser().subscribe(user => {
      this.userId = user.uid;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const source = fromEvent(document.getElementById('searchFormInput'), 'keyup').pipe(map(i => i.target.value));
    const subscribe = source.pipe(debounceTime(300)).subscribe((val) => {
      this.calculateStrength(val);
    });
  }

  send() {
    this.calculateStrength(this.message);
    this.chat.sendMessage(this.message, this.strength.toString());
    this.authService.setUserStatusGivenId(this.emoji.getEmojiLabel(this.strength), this.userId);
    this.message = '';
    this.strength = 0;
  }

  calculateStrength(msg: string) {
    if (msg === '') {
      this.strength = 0;
      return;
    }
    this.tf.getPrediction(msg).then((val) => {
      this.strength =  Math.floor( val * 100);
    });
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
