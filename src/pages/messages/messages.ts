import { Component } from '@angular/core';

import { AlertController, ToastController } from 'ionic-angular';

import { Http } from '@angular/http';

class Data {
  user: string;
  msg: string;
}

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  data : Data;
  private domain : string;
  private toastMessage :string;
  private response : { 
      status: number, 
      msg: string, 
      user: string, 
      contacts: Array<string>
    };
  private names: Array<string>;
  isDisabledField : boolean = true;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private http: Http) {
    this.data = new Data();
    this.data.user = '';
    this.data.msg = '';
    this.domain = 'http://85.86.165.252/indaba/';
    this.toastMessage = '';
    this.names = [ 'Andoni', 'Carla', 'Manolo_Zhan']; 
    this.http = http;
  }

  enableSend(){
    this.isDisabledField=false;
  }

  disableSend(){
    this.isDisabledField=true;
    this.data.user='';
    this.data.msg='';
  }

  setAddress() {
    let prompt = this.alertCtrl.create({
      title: 'Server address',
      message: 'Set the RPi server address',
      inputs: [
        {
          name: 'domain',
          placeholder: 'http://domain.com/',
          value: this.domain,
          type: 'url'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            this.domain = data.domain;
            this.ping();
          }
        }
      ]
    });
    prompt.present();
  }

  selectUser(){
    if(!this.isDisabledField){
      this.getContacts();
    }
  }

  setUser() {
      var options = {
        title: 'Choose an user',
        inputs: [],
        buttons: [
          
          {
            text: 'Ok',
            handler: (data) => {
              this.data.user= data;
            }
          }
        ]
      };

      // Now I add the radio buttons
      for(let i=0; i< this.names.length; i++) {
        options.inputs.push({ name : 'data.name', value: this.names[i], label: this.names[i], type: 'radio' });
      }
      // Create the alert with the options
      let prompt = this.alertCtrl.create(options);
      prompt.present();
  }

  ping () {
    this.http.get(this.domain)
    //this.http.get('http://beta.json-generator.com/api/json/get/VJdqwj5gz')
        .subscribe(res => { 
           try{
             this.response = res.json();
             if (this.response.status == 0){
               this.toastMessage = 'Connection available';
               this.enableSend();
             }else{
               this.toastMessage = 'Connection unavailable.';
               this.disableSend();
             }
           }catch (e){
             this.toastMessage = 'Connection unavailable.';
             this.disableSend();
           }
           this.presentToast();
        }, error => {
            //this.toastMessage = error;
            this.toastMessage = 'The server is down, try again later.';
            this.disableSend();
            this.presentToast();
        });
   }

  sendMessage() {
    if(this.data.user == ''  ){
      this.toastMessage = 'Plese select and user';
      this.presentToast();
    }else if(this.data.msg ==''){
      this.toastMessage = 'Please set a message';
      this.presentToast();
    }else{
      this.isDisabledField = true;
      this.toastMessage = 'Sending...';
      this.presentToast();

      this.http.post(this.domain + 'sendMessage.php', JSON.stringify(this.data))
      //this.http.post('http://beta.json-generator.com/api/json/get/Vyfyujqez', data)
          .subscribe(res => { 
             try{
               this.response = res.json();
               if (this.response.status ==0 ){
                 this.enableSend();
                 this.toastMessage = 'The message \"'+ this.data.msg + '\" was sent to ' + this.data.user + '.';
               }else{
                 this.disableSend();
                 this.toastMessage = 'Error, try again later.';
               }
             } catch (e){
               this.disableSend();
               this.toastMessage = 'Error, try again later.';
             }
             this.presentToast();
          }, error => {
              this.disableSend();
              this.toastMessage = 'The server is down, try again later.';
              this.presentToast();
          });
       }
  }

   getContacts() {
    //this.http.get(this.domain + 'getContacts.php')
    this.http.get('http://beta.json-generator.com/api/json/get/Nke-OjclM')
        .subscribe(res => { 
           try{
             this.response = res.json();
             if (this.response.status == 0 ){
                this.names = this.response.contacts;
                this.toastMessage = "Contact list updated";
                this.setUser();
             }else{
               this.disableSend();
               this.toastMessage = 'Contact list can not be updated, try again later.';
             }
           } catch (e){
             this.disableSend();
             this.toastMessage = 'Error, try again later.';
           }
           this.presentToast();
        }, error => {
            this.disableSend();
            this.toastMessage = 'The server is down, try again later.';
            this.presentToast();
        });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: 4000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }

}
