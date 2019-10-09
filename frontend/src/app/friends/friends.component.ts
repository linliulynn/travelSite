import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Output() newChat = new EventEmitter<String []>();
  @Input() userName: String;
  private chatUsernames: string[];
  private chatUserList: string[];

  constructor() { }

  ngOnInit() {
    // TODO: get friends name from backend, hard coded for convenience right now
    this.chatUsernames = ['Mary', 'Bob', 'Jane'];
    this.chatUserList = [];
  }

  cancel() {
    this.close.emit(true);
  }

  changeChatUser(chatUsername: string) {
    if (this.chatUserList.includes(chatUsername)) {
      this.chatUserList = this.chatUserList.filter(user => user !== chatUsername);
    } else {
      this.chatUserList.push(chatUsername);
    }
  }

  select() {
    this.newChat.emit(this.chatUserList);
  }

}
