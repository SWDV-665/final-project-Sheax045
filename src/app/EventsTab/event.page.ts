import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
//google maps 
import { ViewChild, ElementRef } from '@angular/core';
 
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
 
declare var google;
//google maps 

@Component({
  selector: 'app-EventTab',
  templateUrl: 'event.page.html',  
  styleUrls: ['event.page.scss']
})


export class Tab2Page {
  @ViewChild('map', {static: true}) mapElement: ElementRef;
  map: any;
  address:string;

  @ViewChild('map2', {static: true}) mapElement2: ElementRef;
  map2: any;

  @ViewChild('map3', {static: true}) mapElement3: ElementRef;
  map3: any;
 
  @ViewChild('map4', {static: true}) mapElement4: ElementRef;
  map4: any;

  @ViewChild('map5', {static: true}) mapElement5: ElementRef;
  map5: any;
  
  @ViewChild('map6', {static: true}) mapElement6: ElementRef;
  map6: any;
  

  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {}
  
  //google maps
  ngOnInit() {
    this.loadMap();
  }
 //glensheen: 46.815123, -92.051787 
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(46.815123, -92.051787);
      let latLng2 = new google.maps.LatLng(46.777353, -92.102331);
      let latLng3 = new google.maps.LatLng(46.795016, -92.088148);
      let latLng4 = new google.maps.LatLng(46.779032, -92.104476);
      let latLng5= new google.maps.LatLng(46.782010, -92.093757);
      let latLng6 = new google.maps.LatLng(46.777522, -92.091960);
      let mapOptions = [{
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      {
        center: latLng2,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      {
        center: latLng3,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      {
        center: latLng4,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      {
        center: latLng5,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      {
        center: latLng6,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      ]
   
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions[0]);
      this.map2 = new google.maps.Map(this.mapElement2.nativeElement, mapOptions[1]);
      this.map3 = new google.maps.Map(this.mapElement3.nativeElement, mapOptions[2]);
      this.map4 = new google.maps.Map(this.mapElement4.nativeElement, mapOptions[3]);
      this.map5 = new google.maps.Map(this.mapElement5.nativeElement, mapOptions[4]);
      this.map6 = new google.maps.Map(this.mapElement6.nativeElement, mapOptions[5]);
      

 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
      });
 
  }
}
