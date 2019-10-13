import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-notifications',
 	templateUrl: 'notifications.html',
 })
 export class NotificationsPage {

 	baseURL:string;
 	report_id:number;
 	total:number;
 	notifications=[];

 	constructor(public alertCtrl:AlertController, public toastCtrl: ToastController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 		let temp=this.global.notifications;
 		for (var key in temp) {
 			console.log(key);
 			this.notifications.push(this.global.notifications[key]);
 		}
 	}

 	ionViewDidEnter() {
 		console.log('ionViewDidLoad ContributionsPage');
 	}

 }
