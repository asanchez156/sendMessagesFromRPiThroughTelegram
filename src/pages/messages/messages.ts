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
	private data : Data;
	private domain : string;
	private toastMessage :string;
	private response : { status: number, msg: string, user: string};
	private names: Array<string>;
	private isDisabledSendBtn : boolean = true;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private http: Http) {
  	this.data = new Data();
    this.data.user = '';
    this.data.msg = '';
    //this.domain = 'http://85.86.165.252/';
    this.domain = 'http://echo.jsontest.com/status/0/user/Andoni/message/hola-que-tal/';
    this.toastMessage = '';
    this.names = [ 'Andoni', 'Carla', 'Manolo_Zhan']; 
    this.http = http;
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

  setUser() {
    var options = {
      title: 'User',
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

    // Now we add the radio buttons
    for(let i=0; i< this.names.length; i++) {
      options.inputs.push({ name : 'data.name', value: this.names[i], label: this.names[i], type: 'radio' });
    }
    // Create the alert with the options
    let prompt = this.alertCtrl.create(options);
    prompt.present();
  }

  ping () {
  	this.http.get(this.domain)
        .subscribe(res => { 
         	try{
	         	this.response = res.json();
	         	if (this.response.status ==0 ){
	         		this.toastMessage = 'Connection available';
	         		this.isDisabledSendBtn = false;
	         		
	         	}else{
	         		this.toastMessage = 'Connection unavailable.';
	         		this.isDisabledSendBtn = true;
	         	}
	         }catch (e){
	         	this.toastMessage = 'Connection unavailable.';
	         	this.isDisabledSendBtn = true;
	         }
         	this.presentToast();
        }, error => {
            this.toastMessage = 'The server is down, try again later.';
            this.isDisabledSendBtn = true;
            this.presentToast();
        });
   }

  sendMessage() {
  	var data = JSON.stringify({user: this.data.user, msg: this.data.msg});
	console.log(this.data); 
  	this.http.post(this.domain, data)
        .subscribe(res => { 
         	try{
         		this.response = res.json();
         		if (this.response.status ==0 ){
	         		this.toastMessage = 'The message was sent to ' + this.response.user + '.';
	         		
	         	}else{
	         		this.toastMessage = 'Error, try again later.';
	         	}
         	} catch (e){
         		this.toastMessage = 'Error, try again later.';
         	}
         	
         	this.presentToast();
        }, error => {
            this.toastMessage = 'The server is down, try again later.';
            this.presentToast();
        });

  }

  presentToast() {
	  let toast = this.toastCtrl.create({
	    message: this.toastMessage,
	    duration: 2000,
	    position: 'bottom'
	  });
	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });
	  toast.present();
  }

}
