import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private message;
  messages = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.initSocket();
    this.chatService.getMessage('message').subscribe((data) => {
      this.messages.push(data);
    });
  }

  send() {
    this.chatService.sendMessage('message', this.message);
    this.message = '';
  }

}
