import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from "../providers/global/global";
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ScanPage } from '../pages/scan/scan';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NewReportPage } from '../pages/new-report/new-report';
import { ReportsPage } from '../pages/reports/reports';
import { UsersPage } from '../pages/users/users';
import { SettingsPage } from '../pages/settings/settings';
import { MyContributionsPage } from '../pages/my-contributions/my-contributions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(public global:GlobalProvider, public storage:Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {          
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage;
      this.global.session=null;
    }else{
      if(!this.global.session.fldemail){
        this.global.accessLevel="STANDARD";
      }else{
        this.global.accessLevel="ADMINISTRATOR";
      }
      this.rootPage = HomePage;
    }
  }

  setServerAddress(val){
    if(val!=null){
      this.global.serverAddress=val;
    }else{
      this.global.serverAddress="http://alertzw.000webhostapp.com/";
    }
  }

  openPage(index){
    let myPages=[ScanPage,NotificationsPage,MyContributionsPage,NewReportPage,ReportsPage,ReportsPage,UsersPage,SettingsPage];
    if(index==4 || index==5){
      if(index==4){
        this.nav.push(myPages[index],{'type':'Pending'});
      }else{
        this.nav.push(myPages[index],{'type':'Active'});
      }
    }else{
      this.nav.push(myPages[index]);
    }
  }

  logout(){
    this.storage.remove("session"); 
    this.global.session=null;
    this.global.accessLevel=null;
    this.nav.setRoot(LoginPage);
  }
}
