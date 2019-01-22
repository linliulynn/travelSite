import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {

  private socket;
  private url = 'http://localhost:4000';

  constructor() { }

  initSocket() {
    this.socket = io(this.url);
  }

  sendMessage(messageName: String, message: any) {
    this.socket.emit(messageName, message);
  }

  getMessage(messageName: String) {
    return Observable.create((obsever) => {
      this.socket.on(messageName, (data) => {
        console.log('messageReceived' + data);
        obsever.next(data);
      });
    });
  }
}