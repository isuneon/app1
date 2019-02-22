import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreferStorage } from '../../providers/preferStorage';


@Injectable()
export class CoordenadasProvider {

	constructor(public http: HttpClient,
				public _preferStorage: PreferStorage) {
		
	}


    obtenerPosiciones() {
		return new Promise(resolve => {
			this.http.get(`${this._preferStorage.dict.servicioCoordenadas.urlServicio}`).subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}


	nuevoRegistro(data){
		return new Promise(resolve => {
			this.http.post(`${this._preferStorage.dict.servicioCoordenadas.urlServicio}/registro`, data).subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}
}
