import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-users',
 	templateUrl: 'users.html',
 })
 export class UsersPage {
 	users=[];
 	baseURL:string;
 	constructor(public alertCtrl: AlertController, public toastCtrl:ToastController, public http:Http, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad UsersPage');
 		this.initUsers();
 	}

 	filterUsers(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.users=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.users = this.users.filter((user) => {
 					return ((user.fldforename.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initUsers() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/users.php"
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.users=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	activate(user_id){
 		let url=this.global.serverAddress+"api/user-status.php?activate=true&user_id="+user_id;
 		this.http.get(url)
 		.subscribe(data => {
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				let alert = this.alertCtrl.create({
 					title: 'Users',
 					subTitle: 'User Account successfully activated!',
 					buttons: ['OK']
 				});
 				alert.present();
 				this.initUsers();
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'User Account could not be activated!',
 					duration: 3000,
 					position: 'bottom',
 					cssClass: 'dark-trans',
 					closeButtonText: 'OK',
 					showCloseButton: true
 				});
 				toast.present();
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	deactivate(user_id){
 		let url=this.global.serverAddress+"api/user-status.php?activate=false&user_id="+user_id;
 		this.http.get(url)
 		.subscribe(data => {
 			console.log(data);
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				let alert = this.alertCtrl.create({
 					title: 'Users',
 					subTitle: 'User Account deactivated!',
 					buttons: ['OK']
 				});
 				alert.present();
 				this.initUsers()
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'User Account could not be deactivated!',
 					duration: 3000,
 					position: 'bottom',
 					cssClass: 'dark-trans',
 					closeButtonText: 'OK',
 					showCloseButton: true
 				});
 				toast.present();
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 }
