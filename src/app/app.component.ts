import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistryPage } from '../pages/registry/registry';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    constructor(public platform: Platform, 
                public statusBar: StatusBar, 
                public loadingCtrl: LoadingController,
                public splashScreen: SplashScreen,
                private afAuth: AngularFireAuth) {

        this.initializeApp();

        if(localStorage.getItem("session")){
            this.rootPage = HomePage;
        }else{
            this.rootPage = LoginPage;
        }
    }


    initializeApp() {
        this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
    }


    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }


    cerrarSesion(){
        this.loading('Cerrando sesión');
        if(localStorage.getItem("session") == 'true'){
            this.afAuth.auth.signOut();
        }
        localStorage.removeItem("session");
        this.nav.setRoot(LoginPage)
    }


    loading(texto) {
        let loader = this.loadingCtrl.create({
            content: texto,
            duration: 1500
        });
        loader.present();
    }


    nuevoRegistro(){
        this.nav.push(RegistryPage);
    }

}
