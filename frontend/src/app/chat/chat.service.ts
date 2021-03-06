import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {Chat} from '../models/chat';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChatService {

  private socket;
  private url = 'http://localhost:4000';
  private header = new HttpHeaders().set('Content-Type', 'application/json');
  private addChatUrl = 'http://localhost:8000/chats/';

  constructor(private http: HttpClient) { }

  initSocket() {
    this.socket = io(this.url);
  }

  sendMessage(messageName: String, message: any) {
    this.socket.emit(messageName, message);
  }

  getMessage(messageName: String) {
    return Observable.create((obsever) => {
      this.socket.on(messageName, (data) => {
        console.log(messageName);
        console.log('messageReceived' + data);
        obsever.next(data);
      });
    });
  }
  // Send message into a specific room
  sendMessageToRoom(infoName: String, info: any) {
    this.socket.emit(infoName, info);
  }

  // init channel when load the page
  initChannel(chat: Chat) {
    this.sendMessage('createChannel', chat);
    this.sendMessage('joinRoom', chat.id);
  }

  // add chat to database
  addChat(user_ids: String[]) {
    const body = JSON.stringify({
      user_ids: user_ids
    });
    return this.http.post(this.addChatUrl, body, {headers: this.header, });
  }
}
