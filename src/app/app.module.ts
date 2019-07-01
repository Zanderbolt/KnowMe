import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//TypeQuestion Module
import { TypeQuestionComponent } from '../app/components/type-question/type-question.component';
import { ShowAnswerComponent } from '../app/components/show-answer/show-answer.component';
import { TypeAnswerComponent } from '../app/components/type-answer/type-answer.component';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// To use ngModel
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent, 
    TypeQuestionComponent,
    ShowAnswerComponent,
    TypeAnswerComponent],
  entryComponents: [
    TypeQuestionComponent,
    ShowAnswerComponent,
    TypeAnswerComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
