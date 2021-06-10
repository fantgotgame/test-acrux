import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HeaderComponent } from './layout/header/header.component';
import { SignupComponent } from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {AngularFireModule} from '@angular/fire';
import {FirebaseService} from './services/firebase.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyBJTSXv-YOsUndNyt0QrUDrps686pNsln0',
  authDomain: 'test-acrux.firebaseapp.com',
  databaseURL: 'https://test-acrux-default-rtdb.firebaseio.com',
  projectId: 'test-acrux',
  storageBucket: 'test-acrux.appspot.com',
  messagingSenderId: '467031551322',
  appId: '1:467031551322:web:49ef249e0f11fd818f1763'
};

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
