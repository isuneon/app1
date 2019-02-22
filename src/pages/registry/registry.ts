import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { CoordenadasProvider } from '../../providers/coordenadas/coordenadas';
import { PrincipalProvider } from '../../providers/principal';
import * as moment from 'moment';


@IonicPage()
@Component({
	selector: 'page-registry',
	templateUrl: 'registry.html',
})
export class RegistryPage {

	forma : FormGroup;
	arr = [];
	registrado: boolean = false;
	anio: string;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public formBuilder: FormBuilder,
				public _coordenadasProvider: CoordenadasProvider,
				public _principalProvider: PrincipalProvider) {


		this.anio = moment().format('YYYY')
		this.forma = this.formBuilder.group({
			nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
			numero: ['', Validators.compose([Validators.required, Validators.minLength(11)])],
			IMEI: ['', Validators.compose([Validators.required, Validators.minLength(15)])]
        });

		this.searchDevice()
	}


	ionViewDidLoad() {
		
	}


	searchDevice(){
		this._coordenadasProvider.obtenerPosiciones().then(data => {
            if(data['status'] == 200){
                for(let x in data['data']){
                    this.arr.push(data['data'][x]['IMEI'])
                }
            }
        });
	}


	validateDataDevice(){

		this.registrado = false

		if(this.arr.length > 0){
        	let loader = this._principalProvider.loading('Validando información del dispositivo');
			for(let x in this.arr){
				if(this.arr[x] == this.forma.controls['IMEI']['value']){
					this.registrado = true
				}
			}
			loader.dismiss();
		}

		if(this.registrado){
			this._principalProvider.presentToast("Ya se encuentra un dispositivo registrado con este IMEI", "middle")
		}else{
			this.setDataDevice()
		}
    }


    setDataDevice(){
    	let data = {
            Nombre: this.forma.controls['nombre']['value'],
            Numero: this.forma.controls['numero']['value'],
            IMEI: this.forma.controls['IMEI']['value']
        }
        let loader = this._principalProvider.loading('Guardando información del dispositivo');
		this._coordenadasProvider.nuevoRegistro(data).then(data => {
			if(data['status'] == 200){
				this.navCtrl.setRoot(HomePage)
				this._principalProvider.presentToast("Información del dispositivo guardada exitosamente", "middle", 1000)
			}else{
				this._principalProvider.showAlert("Error", "Ocurrió un error al guardar la información del dispositivo, intentelo nuevamente.")
			}
		});
		loader.dismiss();
    }
}
