import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
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
  strength: number;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const source = fromEvent(document.getElementById('searchFormInput'), 'keyup').pipe(map(i => i.target.value));
    const subscribe = source.pipe(debounceTime(500)).subscribe((val) => {
      this.strength = this.calculateStrength(val);
    });
  }

  send() {
    this.strength = this.calculateStrength(this.message);
    this.chat.sendMessage(this.message, this.strength.toString());
    this.message = '';
    this.strength = 0;
  }

  calculateStrength(msg: string) {
    const strength = Math.floor(Math.random() * 100);
    console.log(strength);
    return strength;
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
