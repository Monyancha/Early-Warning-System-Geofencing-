import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

import { ContributePage } from '../contribute/contribute';

/**
 * Generated class for the MyContributionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-my-contributions',
 	templateUrl: 'my-contributions.html',
 })
 export class MyContributionsPage {
 	contributions=[];
 	baseURL:string;
 	constructor(public alertCtrl:AlertController, public toastCtrl: ToastController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 		this.baseURL=this.global.serverAddress+"api/my-contributions.php?user_id="+this.global.session.flduser_id;
 	}

 	ionViewDidEnter() {
 		this.initContributions();
 		console.log('ionViewDidLoad MyContributionsPage');
 	}

 	filterContributions(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.contributions=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.contributions = this.contributions.filter((contribution) => {
 					return ((contribution.fldtitle.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	newContribution(){
 		this.navCtrl.push(ContributePage);
 	}

 	initContributions() {
 		console.log(this.global.session);
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.contributions=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 }
