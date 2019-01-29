import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private message;
  public messages: Message[] = [];
  typingMessage: String;
  private userName;
  private mesData: Message;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.userName = '';
    this.mesData = new Message('', '');
    this.chatService.initSocket();
    this.chatService.getMessage('message').subscribe((data) => {
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
    this.mesData.name = this.userName;
    this.mesData.message = this.message;
    this.chatService.sendMessage('message', this.mesData);
    this.message = '';
  }

  typing() {
    this.chatService.sendMessage('typing', 'typing test...');
  }

  unTyping() {
    this.chatService.sendMessage('unTyping', 'user not typing');
  }
}
