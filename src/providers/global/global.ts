import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class GlobalProvider {

  	session:any;
  	serverAddress:string;
  	accessLevel=null;
    tempFenceData:any;
    notifications={};

    constructor(private localNotifications: LocalNotifications, public storage:Storage) {
      console.log('Hello GlobalProvider Provider');
    }

    createNotification(notification){
      if(!(notification.fldreport_id in this.notifications)){
        this.notifications[notification.fldreport_id]=notification;
        this.showNotification(notification);
      }
    }

    showNotification(report){
      this.localNotifications.schedule({
        id: report.fldreport_id,
        title: "You Entered "+report.fldtitle,
        text: report.flddescription,
        sound: 'file://sound.mp3',
        data: report,
      });
    }

    
    degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    distanceInKmBetweenEarthCoordinates(coord1, coord2) {
      var earthRadiusKm = 6371;

      var dLat = this.degreesToRadians(coord2.lat-coord1.lat);
      var dLon = this.degreesToRadians(coord2.lng-coord1.lng);

      let lat1 = this.degreesToRadians(coord1.lat);
      let lat2 = this.degreesToRadians(coord2.lat);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return earthRadiusKm * c;
    }


  }







