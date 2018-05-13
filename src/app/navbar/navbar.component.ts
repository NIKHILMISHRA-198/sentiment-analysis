import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmojiService } from '../services/emoji.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  userEmail: string;
  @Input() mainEmoji: string;

  constructor(private authService: AuthService, private router: Router, private emoji: EmojiService) {
  }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['login']);
  }
}
