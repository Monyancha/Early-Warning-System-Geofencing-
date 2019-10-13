import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var google: any;
 @IonicPage()
 @Component({
 	selector: 'page-scan',
 	templateUrl: 'scan.html',
 })
 export class ScanPage {
 	@ViewChild('map') mapElement: ElementRef;
 	map: any;
 	markers=[];
 	buffers=[];
 	reports=[];
 	toast:any;

 	constructor(public global: GlobalProvider, public alertCtrl: AlertController, public toastCtrl:ToastController,public storage: Storage,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
 		this.reports=navParams.get('reports');
 		if(this.reports==null){
 			this.navCtrl.pop();
 		}
 	}

 	ionViewDidLoad() {
 		this.platform.ready().then(() => {
 			this.initMap();
 		});
 	}

 	populate(){
 		for (var i = 0; i<this.reports.length; i++) {
 			let infoWindowData:any={
 				title: this.reports[i].fldtitle,
 				contentString: '<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">'+this.reports[i].fldtitle+'</h2><div id="bodyContent"><table><tr><td><b>Description</b></td></tr><tr><td>'+this.reports[i].flddescription+'</td></tr><tr><td><b>Measure</b></td></tr><tr><td>'+this.reports[i].fldmeasure+'</td></tr></table></div></div>'
 			};
 			let location = new google.maps.LatLng(this.reports[i].fldlatitude,this.reports[i].fldlongitude);
 			this.addMarker(location,infoWindowData,this.reports[i].fldradius);
 		}
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

 	initMap() {
 		this.geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then((resp) => {
 			let location = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
 			this.map = new google.maps.Map(this.mapElement.nativeElement, {
 				zoom: 15,
 				center: location,
 				mapTypeId: 'terrain'
 			});
 			let infoWindowData:any={
 				title: "My Location",
 				contentString: '<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">My Location</h2><div id="bodyContent">'+this.global.session.fldforename+' '+this.global.session.fldsurname+'</div></div>'
 			};
 			this.addMarker(location,infoWindowData,0);
 			if(this.reports){
 				this.populate();
 			}
 		}, err => {
 			this.makeToast(err.message);
 		});
 	}

 	addMarker(location,infoWindowData,radius) {
 		let marker = new google.maps.Marker({
 			position: location,
 			animation: google.maps.Animation.DROP,
 		});
 		var infowindow = new google.maps.InfoWindow({
 			content: infoWindowData.contentString
 		});
 		marker.addListener('click', function() {
 			infowindow.open(this.map, marker);
 			setTimeout(function(){infowindow.close();},5000); 
 		});
 		marker.addListener('dragend', ()=>{
 			this.sync();
 		});
 		if(radius!=0){
 			this.setBuffer(location,radius);
 			let icon={url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"};
 			marker.setIcon(icon);
 		}else{
 			marker.setDraggable(true);
 		}
 		marker.setMap(this.map);
 		this.markers.push(marker);
 	}

 	sync(){
 		let temp=this.markers[0].getPosition();
 		if(temp){
 			let location={'lat':temp.lat(),'lng':temp.lng()};
 			for (var i = 0; i< this.reports.length; i++) {
 				let tempLocation={'lat':this.reports[i].fldlatitude,'lng': this.reports[i].fldlongitude};
 				let distance=this.global.distanceInKmBetweenEarthCoordinates(location,tempLocation);
 				if((distance*1000)<=this.reports[i].fldradius){
 					this.global.createNotification(this.reports[i]);
 				}
 			}
 		}
 	}

 	setBuffer(location,radius){
		/*if(this.buffers!=null){
 			this.buffers.setMap(null);
 		}*/
 		radius=parseFloat(radius.toString());
 		let buffer = new google.maps.Circle({
 			strokeColor: '#A9A9A9',
 			strokeOpacity: 0.8,
 			strokeWeight: 2,
 			fillColor: '#C0C0C0',
 			fillOpacity: 0.35,
 			center: location,
 			radius: radius,
 		});
 		buffer.setMap(this.map);
 		this.buffers.push(buffer);
 	}
 }
