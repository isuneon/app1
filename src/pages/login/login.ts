import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PrincipalProvider } from '../../providers/principal';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as moment from 'moment';


@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	anio: string;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public _principalProvider: PrincipalProvider,
				private afAuth: AngularFireAuth) {

		this.anio = moment().format('YYYY')
	}


	ionViewDidLoad() {
	}


	inicioSesionFacebook(){
        let loader = this._principalProvider.loading('Iniciando sesión con Facebook');
		this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
            if(res['user']['email']){
                localStorage.setItem("session", 'true');
                this.navCtrl.setRoot(HomePage)
            }
        	loader.dismiss();
        });
	}


	inicioSesionGoogle(){
        let loader = this._principalProvider.loading('Iniciando sesión con Google');
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
            if(res['user']['email']){
                localStorage.setItem("session", 'true');
                this.navCtrl.setRoot(HomePage)
            }
        	loader.dismiss();
        });
	}

}
