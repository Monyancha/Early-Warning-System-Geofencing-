import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { HomePage } from '../home/home';
import { AdminLoginPage } from '../admin-login/admin-login';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {
 	private loginForm: FormGroup;

 	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, private formBuilder: FormBuilder,public global:GlobalProvider, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController, private storage: Storage) {
 		this.loginForm=this.formBuilder.group({
 			phoneno: ['',Validators.required],
 			password: ['',Validators.required]
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad LoginPage');
 	}

 	loginFxn(){
 		if(this.loginForm.valid){
 			let loader = this.loadingCtrl.create({
 				content: "Authenticating...",
 				spinner:"bubbles"
 			});
 			loader.present();
 			this.http.post(this.global.serverAddress+"api/login.php", JSON.stringify(this.loginForm.value))
 			.subscribe(data => {
 				console.log(data["_body"]);
 				let response=JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					let toast = this.toastCtrl.create({
 						message: 'Login was successfully',
 						duration: 3000,
 						position: 'bottom',
 						cssClass: 'dark-trans',
 						closeButtonText: 'OK',
 						showCloseButton: true
 					});
 					toast.present();
 					//this.global.accessLevel="CITIZEN";
 					this.navCtrl.setRoot(HomePage);           
 					this.storage.set("session",response);
 					this.global.session=response;
 					this.global.accessLevel="STANDARD";
 				}else{
 					if(response.error=="account disabled"){
 						let alert = this.alertCtrl.create({
 							title: 'Login',
 							subTitle: 'Account is deactivated! Contact Administrator!',
 							buttons: ['OK']
 						});
 						alert.present();
 					}else{
 						let alert = this.alertCtrl.create({
 							title: 'Login',
 							subTitle: 'Incorrect Phone Number or Password!',
 							buttons: ['OK']
 						});
 						alert.present();
 					}
 				}  
 			}, error => {
 				let toast = this.toastCtrl.create({
 					message: 'Resolve Connectivity Issue!',
 					duration: 3000,
 					position: 'bottom',
 					cssClass: 'dark-trans',
 					closeButtonText: 'OK',
 					showCloseButton: true
 				});
 				toast.present();
 			}
 			);
 			loader.dismiss();
 		}else{
 			let toast = this.toastCtrl.create({
 				message: 'Properly fill in all details!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		}
 	}

 	signup(){
 		this.navCtrl.push(SignupPage);
 	}

 	adminLogin() {
 		this.navCtrl.setRoot(AdminLoginPage);
 	}

 }
