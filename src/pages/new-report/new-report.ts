import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';

/**
 * Generated class for the NewReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-new-report',
 	templateUrl: 'new-report.html',
 })
 export class NewReportPage {
 	isLocationSet=false;
 	ReportOptions=[];
 	report:any;
 	selectedItem:number;
 	reportTypes=["Epidemic","Natural Disaster"];
 	public title:string;
 	defaultPhotoPath:string="assets/imgs/placeholder.jpg";
 	imgPath=this.defaultPhotoPath;
 	public formAddEdit: FormGroup;

 	constructor(public camera:Camera, public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
 		this.global.tempFenceData=null;
 		let tempReport=navParams.get('report');
 		if(!tempReport){
 			this.title="New Report";
 		}else{
 			this.report=tempReport;
 			this.title=tempReport.fldtitle;
 			if(this.report.fldpicture!=""){
 				this.imgPath=this.report.fldpicture;
 			}
 			this.selectedItem=this.reportTypes.indexOf(tempReport.fldtype);
 			this.global.tempFenceData={'lat':tempReport.fldlatitude,'lng':tempReport.fldlongitude,'radius':tempReport.fldradius};
 		}
 		this.formAddEdit=this.formBuilder.group({
 			title: ['',Validators.required],
 			type: ['',Validators.required],      
 			description: ['',Validators.required],
 			measure: ['',Validators.required],
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad NewReportPage');
 	}

 	returnHome(){
 		this.navCtrl.setRoot(HomePage);
 	}

 	addEdit() {
 		if(this.formAddEdit.valid && this.imgPath!=this.defaultPhotoPath){
 			let loader = this.loadingCtrl.create({
 				content: "Processing...",
 				spinner:"bubbles"
 			});

 			loader.present();
 			let postData:any;
 			postData=this.formAddEdit.value;
 			postData["latitude"]=this.global.tempFenceData.lat;
 			postData["longitude"]=this.global.tempFenceData.lng;
 			postData["picture"]=this.imgPath;
 			postData["radius"]=this.global.tempFenceData.radius;
 			let mybaseURL:string;
 			if(this.report){
 				mybaseURL=this.global.serverAddress+"api/edit_report.php?report_id="+this.report.fldreport_id;
 			}else{
 				mybaseURL=this.global.serverAddress+"api/add_report.php";
 			}
 			this.http.post(mybaseURL, JSON.stringify(postData))
 			.subscribe(data => {
 				console.log(data["_body"]);
 				let response = JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					loader.dismiss();
 					let alert = this.alertCtrl.create({
 						title: 'Report',
 						subTitle: this.title+' Report successfully saved!',
 						buttons: ['OK']
 					});
 					alert.present();
 					this.navCtrl.popToRoot();
 					//this.returnHome();
 				}else{
 					loader.dismiss();
 					let alert = this.alertCtrl.create({
 						title: 'Edit Report',
 						subTitle: this.title+' Report could not be saved!',
 						buttons: ['OK']
 					});
 					alert.present();
 				}
 			}, error => {
 				loader.dismiss();
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

 	takePhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			//sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			encodingType: this.camera.EncodingType.JPEG,
 			mediaType: this.camera.MediaType.PICTURE,
 			saveToPhotoAlbum: false,
 			allowEdit: false,
 			targetWidth:  500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not access camera!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}

 	getPhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			saveToPhotoAlbum: false,
 			allowEdit: true,
 			targetWidth: 500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not open Gallery!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}

 	locate(){
 		this.navCtrl.push(LocationPage);
 	}

 }
