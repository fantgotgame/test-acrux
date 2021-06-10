import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public isSignedIn = false;
  public errorMessage = '';

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
  });

  constructor(
    public firebaseService: FirebaseService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.firebaseService.signup(email, password).then(response => {
      console.log(response);
    }).catch( error => {
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
