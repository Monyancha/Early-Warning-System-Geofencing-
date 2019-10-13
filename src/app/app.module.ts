import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AdminLoginPage } from '../pages/admin-login/admin-login';
import { SettingsPage } from '../pages/settings/settings';
import { ScanPage } from '../pages/scan/scan';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ContributePage } from '../pages/contribute/contribute';
import { NewReportPage } from '../pages/new-report/new-report';
import { ReportsPage } from '../pages/reports/reports';
import { UsersPage } from '../pages/users/users';
import { SignupPage } from '../pages/signup/signup';
import { LocationPage } from '../pages/location/location';
import { PaymentPage } from '../pages/payment/payment';
import { MyContributionsPage } from '../pages/my-contributions/my-contributions';
import { ContributionsPage } from '../pages/contributions/contributions';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AdminLoginPage,
    SettingsPage,
    ScanPage,
    NotificationsPage,
    ContributePage,
    NewReportPage,
    ReportsPage,
    UsersPage,
    SignupPage,
    LocationPage,
    PaymentPage,
    MyContributionsPage,
    ContributionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AdminLoginPage,
    SettingsPage,
    ScanPage,
    NotificationsPage,
    ContributePage,
    NewReportPage,
    ReportsPage,
    UsersPage,
    SignupPage,
    LocationPage,
    PaymentPage,
    MyContributionsPage,
    ContributionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    Camera,
    Geolocation,
    LocalNotifications
  ]
})
export class AppModule {}
