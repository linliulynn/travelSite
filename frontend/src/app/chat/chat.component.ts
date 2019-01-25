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
  typingMessage: String;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.initSocket();
    this.chatService.getMessage('message').subscribe((data) => {
      // this.typingInfo = '';
      this.messages.push(data);
    });
    this.chatService.getMessage('typing').subscribe((data) => {
      this.typingMessage = data;
    });
    this.chatService.getMessage('unTyping').subscribe((data) => {
      this.typingMessage = '';
    });
  }

  send() {
    this.chatService.sendMessage('message', this.message);
    this.message = '';
  }

  typing() {
    this.chatService.sendMessage('typing', 'typing test...');
  }

  unTyping() {
    this.chatService.sendMessage('unTyping', 'user not typing');
  }
}
