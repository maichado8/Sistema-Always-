import { Injectable } from '@angular/core';
import { HeaderData } from './header-date-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Incio',
    icon: 'Dashboard',
    routeUrl: ''
  })

  constructor() { }

  get HeaderData(): HeaderData {
    return this._headerData.value
  }
  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData)
  }
}
