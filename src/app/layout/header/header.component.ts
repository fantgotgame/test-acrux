import {Component, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  constructor(
    public firebaseService: FirebaseService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logOut(): void {
    this.firebaseService.logout();
    location.reload();
    this.isLoggedIn = false;
  }
}
