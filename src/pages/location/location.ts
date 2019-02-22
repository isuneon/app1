import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrincipalProvider } from '../../providers/principal';
import { HomePage } from '../home/home'
import * as moment from 'moment';
declare var google;


@IonicPage()
@Component({
    selector: 'page-location',
    templateUrl: 'location.html',
})
export class LocationPage {

    map: any;
    datos: any;
    anio: string;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public _principalProvider: PrincipalProvider) {

        this.anio = moment().format('YYYY')
        this.datos = navParams.get("datos");

	}


	ionViewDidLoad() {
		if(this.datos['latitude'] && this.datos['longitude']){
			this.loadMap()
		}else{
			this._principalProvider.presentToast("El dispositivo " + this.datos['Nombre'] + " no ha establecido su ubicación. Redireccionando a la página principal...", "middle")
			setTimeout(() =>{
				this.navCtrl.setRoot(HomePage)
            },3000);
		}
	}


  	loadMap(){
    	let latitude = this.datos['latitude'];
    	let longitude = this.datos['longitude'];
    
    	// create a new map by passing HTMLElement
    	let mapEle: HTMLElement = document.getElementById('map');

    	// create LatLng object
    	let myLatLng = {lat: latitude, lng: longitude};

    	// create map
    	this.map = new google.maps.Map(mapEle, {
      		center: myLatLng,
      		zoom: 17
    	});

    	google.maps.event.addListenerOnce(this.map, 'idle', () => {
      		new google.maps.Marker({
        		position: myLatLng,
        		map: this.map,
        		title: 'Hello World!'
      		});
      		mapEle.classList.add('show-map');
    	});
  	}
}
