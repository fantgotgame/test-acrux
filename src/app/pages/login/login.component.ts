import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
  });

  public isSignedIn = false;
  public errorMessage = '';
  constructor(
    public firebaseService: FirebaseService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  async login(email: string, password: string): Promise<void> {
    this.errorMessage = '';
    await this.firebaseService.login(email, password).then().catch(error => {
      this.errorMessage = error.message;
    });
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      await this.router.navigate(['/']);
    }
  }

  clearError(): void {
    this.errorMessage = '';
  }
}
