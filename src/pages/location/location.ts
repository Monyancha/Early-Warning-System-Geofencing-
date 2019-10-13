import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var google: any;
 @IonicPage()
 @Component({
 	selector: 'page-location',
 	templateUrl: 'location.html',
 })
 export class LocationPage {
 	@ViewChild('map') mapElement: ElementRef;
 	map: any;
 	public marker:any;
 	toast:any;
 	radius:number=1000;
 	buffer:any;

 	constructor(public global: GlobalProvider, public alertCtrl: AlertController, public toastCtrl:ToastController,public storage: Storage,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
 		this.global.tempFenceData=null;
 	}

 	ionViewDidLoad() {
 		this.platform.ready().then(() => {
 			this.initMap();
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

 	initMap() {
 		//timeout: 5000
 		this.geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then((resp) => {
 			let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
 			this.map = new google.maps.Map(this.mapElement.nativeElement, {
 				zoom: 15,
 				center: mylocation,
 				mapTypeId: 'terrain'
 			});
 			this.addMarker(mylocation);
 		}, err => {
 			this.makeToast("Error: "+err.message);
 		});
 	}

 	addMarker(location) {
 		this.marker = new google.maps.Marker({
 			position: location,
 			map: this.map,
 			animation: google.maps.Animation.DROP,
 			draggable: true
 		});
 		let infoWindowData:any={
 			title: "Epicenter",
 			contentString: '<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">My Location</h2><div id="bodyContent">Phone No: '+this.global.session.fldphoneno+'<br/>Role: '+this.global.session.fldrole+'<br/>Date/Time: '+this.global.session.fldtimestamp+'</div></div>'

 		};
 		this.setBuffer();
 		var infowindow = new google.maps.InfoWindow({
 			content: infoWindowData.contentString
 		});
 		this.marker.addListener('click', function() {
 			infowindow.open(this.map, this.marker);
 			setTimeout(function(){infowindow.close();},5000); 
 		});
 		this.marker.addListener('dragend', ()=>{
 			this.updateBuffer()
 		});
 		this.marker.setPosition(location);
 	}

 	setBuffer(){
 		if(this.buffer!=null){
 			this.buffer.setMap(null);
 		}
 		let radius=parseFloat(this.radius.toString());
 		if(radius<100){
 			radius=1000;
 			this.radius=radius;
 			this.makeToast("Radius cannot be less than 100m");
 		}
 		this.buffer = new google.maps.Circle({
 			strokeColor: '#A9A9A9',
 			strokeOpacity: 0.8,
 			strokeWeight: 2,
 			fillColor: '#C0C0C0',
 			fillOpacity: 0.35,
 			center: this.marker.getPosition(),
 			radius: radius,
 		});
 		this.buffer.setMap(this.map);
 	}

 	public updateBuffer(){
 		let radius=parseFloat(this.radius.toString());
 		this.buffer.setRadius(radius);
 		this.buffer.setCenter(this.marker.getPosition());
 	}

 	save(){
 		let location=null;
 		if(this.marker){
 			location=this.marker.getPosition();
 			let data={'lat':location.lat(),'lng':location.lng(),'radius':this.radius};
 			this.global.tempFenceData=data;
 			this.makeToast("Successfully Captured Location Data!");
 			this.navCtrl.pop();
 		}else{
 			this.makeToast("Please choose Epicentre!");
 		}
 	}
 }
