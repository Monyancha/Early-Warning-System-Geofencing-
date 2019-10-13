import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { Geolocation } from '@ionic-native/geolocation';

import { ScanPage } from '../scan/scan';
import { NewReportPage } from '../new-report/new-report';
import { ReportsPage } from '../reports/reports';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	reports=[];
	baseURL:string;
	location:any;
	toast:any;
	constructor(public toastCtrl:ToastController, public geolocation:Geolocation, public http:Http, public global:GlobalProvider, public navCtrl: NavController, public platform: Platform) {
		this.baseURL=this.global.serverAddress+"api/reports.php?active";
	}

	ionViewDidEnter() {
		if(this.location){
			this.ionViewDidLoad();
		}
		this.initReports();
		console.log('ionViewDidLoad HomePage');
	}

	sync(){
		if(this.location){
			for (var i = 0; i< this.reports.length; i++) {
				let tempLocation={'lat':this.reports[i].fldlatitude,'lng': this.reports[i].fldlongitude};
				let distance=this.global.distanceInKmBetweenEarthCoordinates(this.location,tempLocation);
				if((distance*1000)<=this.reports[i].fldradius){
					this.global.createNotification(this.reports[i]);
				}
				console.log(distance);
			}
		}
	}

	ionViewDidLoad() {
		this.platform.ready().then(() => {
			this.getLocation();
		});
	}

	getLocation() {
		this.geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then((resp) => {
			this.location={'lat':resp.coords.latitude,'lng':resp.coords.longitude};
			console.log(this.location);
		}, err => {
			this.makeToast("Error: "+err.message);
		});
	}

	makeToast(message:string){
		this.toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom',
			cssClass: 'dark-trans',
			closeButtonText: 'OK',
			showCloseButton: true
		});
		this.toast.present();
	}

	initReports() {
		this.http.get(this.baseURL)
		.subscribe(data => {
			console.log(data);
			this.reports=JSON.parse(data["_body"]);
			this.sync();
		}, error => {
			console.log("failed");
		}
		);
	}

	pendingReports(){
		this.navCtrl.push(ReportsPage,{'type':'Pending'});
	}

	activeReports(){
		this.navCtrl.push(ReportsPage,{'type':'Active'});
	}

	scanArea(){
		this.navCtrl.push(ScanPage,{'reports':this.reports});
	}

	newReport(){
		this.navCtrl.push(NewReportPage);
	}
}
