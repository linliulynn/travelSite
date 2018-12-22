import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private socket;
  private url = 'http://localhost:4000';
  private message;
  messages = [];

  constructor() { }

  ngOnInit() {
    this.socket = io(this.url);
    this.socket.on('message', (data) => {
      console.log('messageReceived' + data);
      this.messages.push(data);
    });
  }

  send() {
    this.socket.emit('message', this.message);
    this.message = '';
  }

}
