import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';


/* Components */
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegistryPage } from '../pages/registry/registry';
import { LocationPage } from '../pages/location/location';


/* Providers */
import { PreferStorage } from '../providers/preferStorage';
import { PrincipalProvider } from '../providers/principal';
import { CoordenadasProvider } from '../providers/coordenadas/coordenadas';


/* Variables de firebase */   
export const firebaseConfig = {
    apiKey: "AIzaSyAwnjchcSuE-Bthp6WLXYKjdSA-_SrcEO4",
    authDomain: "coordenadasapp.firebaseapp.com",
    databaseURL: "https://coordenadasapp.firebaseio.com",
    projectId: "coordenadasapp",
    storageBucket: "coordenadasapp.appspot.com",
    messagingSenderId: "562595134531"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        RegistryPage,
        LocationPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        RegistryPage,
        LocationPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        PreferStorage,
        PrincipalProvider,
        CoordenadasProvider,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ]
})
export class AppModule {}
