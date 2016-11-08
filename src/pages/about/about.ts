import { Component } from '@angular/core';

import {InAppBrowser} from 'ionic-native';


import { NavController } from 'ionic-angular';

@Component({
  	selector: 'page-about',
  	templateUrl: 'about.html'
})
export class AboutPage {

  	constructor(public navCtrl: NavController) {

 	}

 	openTwitter() {
		let browser = new InAppBrowser('https://twitter.com/andonisanchezz', '_system');
			//browser.close();
	}

	openGitHub() {
		let browser = new InAppBrowser('http://asanchez.my-style.in/projects-es/', '_system');
			//browser.close();
	}

	openMySite() {
		let browser = new InAppBrowser('https://github.com/asanchez156', '_system');
			//browser.close();
	}

}
