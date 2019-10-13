import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

   serverAddress:string;
   private settingsForm: FormGroup;
   constructor(private formBuilder: FormBuilder,public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController, public storage: Storage) {
     this.serverAddress=this.global.serverAddress;
     var myServerAdressValidator=[Validators.required,Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')];
     this.settingsForm=this.formBuilder.group({
       serverAddress: ['',myServerAdressValidator]
     });
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad SettingsPage');
   }

   updateSettings(){
     if(this.settingsForm.valid){
       this.storage.set("serverAddress",this.serverAddress);
       this.global.serverAddress=this.serverAddress;
       let toast = this.toastCtrl.create({
         message: 'Settings have been updated!',
         duration: 3000,
         position: 'bottom',
         cssClass: 'dark-trans',
         closeButtonText: 'OK',
         showCloseButton: true
       });
       toast.present();
     }else{
       let toast = this.toastCtrl.create({
         message: 'Invalid URL!',
         duration: 3000,
         position: 'bottom',
         cssClass: 'dark-trans',
         closeButtonText: 'OK',
         showCloseButton: true
       });
       toast.present();
     }
   }
}
