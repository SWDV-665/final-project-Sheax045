import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DllServiceService } from '../dll-service.service';



@Component({
  selector: 'app-ContactTab',
  templateUrl: 'Contact.page.html',
  styleUrls: ['Contact.scss']
})
export class Tab3Page {
  email = [];
  errorMessage:string

  constructor(public navCtrl: NavController, public dataService: DllServiceService) {}

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }
  
  facebook(){
    this.navCtrl.navigateRoot('https://www.facebook.com/duluthloveslocal/');
   }

}
