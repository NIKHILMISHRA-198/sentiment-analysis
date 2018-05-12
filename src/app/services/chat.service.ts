import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable()
export class ChatService {

  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth;
        // TODO: Set this.userName from auth object while implementing auth service
      }
    });
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // TODO: Implement auth service which connects to firebase and handles authentication
    // to get email and userName
    // const email = this.user.email;
    const email = 'test@example.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: 'test-user',
     // userName: this.userName,
      email: email
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return (date + ' ' + time);
  }

  getMessages(): AngularFireList<ChatMessage> {
    // query to get message feed
    return this.db.list('messages', refer => refer.limitToLast(25).orderByKey());
  }
}
