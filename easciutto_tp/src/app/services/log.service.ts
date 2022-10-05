/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logs } from 'selenium-webdriver';
import { environment } from 'src/environments/environment.prod';
import { Log } from '../model/log';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  //urlApi=environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getLogs(idElectrovalvula: number): Promise<Log[]>{
    return this._http.get(`http://localhost:8000/api/electrovalvula/${idElectrovalvula}/logs`).toPromise().then((logs: Log[])=>{
      return logs;
    });
  }
}
