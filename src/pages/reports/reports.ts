import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { NewReportPage } from '../new-report/new-report';
import { ContributionsPage } from '../contributions/contributions';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-reports',
 	templateUrl: 'reports.html',
 })
 export class ReportsPage {

 	reports=[];
 	total:number;
 	productsURL:string;
 	baseURL:string;
 	title:string;
 	constructor(public alertCtrl:AlertController, public toastCtrl: ToastController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 		let type=navParams.get('type');
 		if(!type){
 			this.navCtrl.pop();
 		}
 		if(type=='Active'){
 			this.title="Active Reports";
 			this.baseURL=this.global.serverAddress+"api/reports.php?active"
 		}else{
 			this.title="Pending Reports";
 			this.baseURL=this.global.serverAddress+"api/reports.php"
 		}
 	}

 	ionViewDidEnter() {
 		this.initReports();
 		console.log('ionViewDidLoad ReportsPage');
 	}

 	filterReports(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.reports=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.reports = this.reports.filter((report) => {
 					return ((report.fldtitle.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initReports() {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.reports=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	edit(report){
 		this.navCtrl.push(NewReportPage, {'report':report});
 	}

 	add(){
 		this.navCtrl.push(NewReportPage);
 	}

 	delete(report_id) {
 		let url=this.global.serverAddress+"api/delete-report.php?report_id="+report_id;
 		this.http.get(url)
 		.subscribe(data => {
 			console.log(data);
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				this.initReports();
 				let alert = this.alertCtrl.create({
 					title: 'Reports',
 					subTitle: 'Report deleted successfully!',
 					buttons: ['OK']
 				});
 				alert.present();
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'Report could not be deleted!',
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

 	approve(report_id) {
 		let url=this.global.serverAddress+"api/approve.php?report_id="+report_id;
 		this.http.get(url)
 		.subscribe(data => {
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				this.initReports();
 				let alert = this.alertCtrl.create({
 					title: 'Reports',
 					subTitle: 'Report approved successfully!',
 					buttons: ['OK']
 				});
 				alert.present();
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'Report could not be approved!',
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

 	viewContributions(report_id){
 		this.navCtrl.push(ContributionsPage,{"report_id":report_id});
 	}

 }
