import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

import { PaymentPage } from '../payment/payment';
/**
 * Generated class for the ContributePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contribute',
  templateUrl: 'contribute.html',
})
export class ContributePage {

 	causes=[];
 	total:number;
 	productsURL:string;
 	baseURL:string;
 	constructor(public alertCtrl:AlertController, public toastCtrl: ToastController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 		this.baseURL=this.global.serverAddress+"api/reports.php?active"
 	}

 	ionViewDidEnter() {
 		this.initCauses();
 		console.log('ionViewDidLoad ContributePage');
 	}

 	filterCauses(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.causes=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.causes = this.causes.filter((report) => {
 					return ((report.fldtitle.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	contribute(cause){
 		this.navCtrl.push(PaymentPage,{"cause":cause})
 	}

 	initCauses() {
 		console.log(this.global.session);
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.causes=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

}
