import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the ContributionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-contributions',
 	templateUrl: 'contributions.html',
 })
 export class ContributionsPage {
 	contributions=[];
 	baseURL:string;
 	report_id:number;
 	total:number;

 	constructor(public alertCtrl:AlertController, public toastCtrl: ToastController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 		this.report_id=navParams.get('report_id');
 		if(!this.report_id){
 			this.navCtrl.pop();
 		}
 	}

 	ionViewDidEnter() {
 		this.initContributions();
 		console.log('ionViewDidLoad ContributionsPage');
 	}

 	filterContributions(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			let mydata=JSON.parse(data["_body"]);
 			if(mydata){
 				this.contributions=mydata["contributions"];
 				this.total=mydata["total"];
 			}
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.contributions = this.contributions.filter((contribution) => {
 					return ((contribution.fldforename.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initContributions() {
 		this.baseURL=this.global.serverAddress+"api/contributions.php?report_id="+this.report_id;
 		console.log(this.global.session);
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			let mydata=JSON.parse(data["_body"]);
 			if(mydata){
 				this.contributions=mydata["contributions"];
 				this.total=mydata["total"];
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 }
