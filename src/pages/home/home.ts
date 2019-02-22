import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrincipalProvider } from '../../providers/principal';
import { CoordenadasProvider } from '../../providers/coordenadas/coordenadas';
import { LocationPage } from '../location/location';
import { RegistryPage } from '../registry/registry';
import * as moment from 'moment';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    arr = [];
    arrSearch: any;
    devices: boolean = true;
    anio: string;

    constructor(public navCtrl: NavController,
                public _principalProvider: PrincipalProvider,
                public _coordenadasProvider: CoordenadasProvider) {

        this.anio = moment().format('YYYY')
        
    }


    ionViewDidLoad() {
        this.getDevices()
    }


    getDevices() {
        this._coordenadasProvider.obtenerPosiciones().then(data => {
            if(data['status'] == 200){
                for(let x in data['data']){
                    data['data'][x]['id'] = x
                    this.arr.push(data['data'][x])
                }
                this.arrSearch = this.arr;
            }else{
                this.devices = false;
            }
        });
    }


    filter(ev: any) {
        // Reset items back to all of the items
        this.arr = this.arrSearch

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.arr = this.arr.filter((item) => {
                return (item.Nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }


    doRefresh(refresher) {
        this.arr = []
        this.devices = true;
        setTimeout(() => {
            this.getDevices()
            refresher.complete();
        }, 2000);
    }


    verUbicacion(data){
        this.navCtrl.push(LocationPage, {datos: data})
    }


    nuevoRegistro(){
        this.navCtrl.push(RegistryPage)
    }
}
