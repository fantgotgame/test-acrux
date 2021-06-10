import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  dataFeedbacksFirebase = [];
  isLoggedIn = false;
  dataNewFedback: any;
  feedbackSended = false;

  feedbackForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.firebaseService.getDataFromFirebase().subscribe(response => {
      Object.values(response).forEach((item: any) => {
        this.dataFeedbacksFirebase.push({
          name: item.name,
          email: item.email,
          phone: item.phone
        });
      });
    });
  }

  sendFeedback(name: string, email: string, phone: string): void {
    this.dataNewFedback = JSON.stringify({
      name,
      email,
      phone
    });
    this.firebaseService.sendNewFeedback(this.dataNewFedback).subscribe( response => {
      console.log(response);
      this.feedbackSended = true;
      this.feedbackForm.reset();
      setTimeout( () => {
        this.feedbackSended = false;
      }, 5000);
    });
  }
}
