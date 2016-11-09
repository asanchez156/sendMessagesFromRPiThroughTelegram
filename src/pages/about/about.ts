import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  	selector: 'page-about',
  	templateUrl: 'about.html'
})
export class AboutPage {

  	constructor(public navCtrl: NavController) {

 	}

 	openTwitter() {
    	open('https://twitter.com/andonisanchezz', "_system", "location=no");
		//new InAppBrowser('https://twitter.com/andonisanchezz', '_system');
	}

	openGitHub() {
		open('http://asanchez.my-style.in/projects-es/', '_system', "location=no");
	}

	openMySite() {
		open('https://github.com/asanchez156', '_system', "location=no");
	}

}
