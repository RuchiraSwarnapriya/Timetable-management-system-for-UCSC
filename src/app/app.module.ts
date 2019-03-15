import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HallsComponent } from './halls/halls.component';

// tslint:disable-next-line:prefer-const
let config = {
  apiKey: 'AIzaSyAO3dPICHK8GbsBOsHXnjOIsnY1ABELVFk',
  authDomain: 'timetablemanager-1769a.firebaseapp.com',
  databaseURL: 'https://timetablemanager-1769a.firebaseio.com',
  projectId: 'timetablemanager-1769a',
  storageBucket: 'timetablemanager-1769a.appspot.com',
  messagingSenderId: '142400018060'
};
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    HallsComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
