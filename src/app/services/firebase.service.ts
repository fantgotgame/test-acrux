import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  async login(email: string, password: string): Promise<void> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(response.user));
      });
  }

  async signup(email: string, password: string): Promise<void> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(response.user));
      });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getDataFromFirebase(): Observable<any> {
    return this.http.get(`https://test-acrux-default-rtdb.firebaseio.com/feedbacks.json`);
  }

  public sendNewFeedback(data: any): Observable<any> {
    return this.http.post(`https://test-acrux-default-rtdb.firebaseio.com/feedbacks.json`, data);
  }
}
