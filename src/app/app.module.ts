import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DocentePipe } from './05-pipes/docente.pipe';
import { EstudiantePipe } from './05-pipes/estudiante.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DocentePipe,
    EstudiantePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),    
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
