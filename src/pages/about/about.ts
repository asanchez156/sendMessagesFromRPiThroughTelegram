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
    	open('https://twitter.com/andonisanchezz', "_blanc", "location=no");
		//new InAppBrowser('https://twitter.com/andonisanchezz', '_system');
	}

	openMySite() {
		open('http://asanchez.my-style.in/projects-es/', '_blanc', "location=no");
	}

	openGitHub() {
		open('https://github.com/asanchez156', '_blanc', "location=no");
	}

}
