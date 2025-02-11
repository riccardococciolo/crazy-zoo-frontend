import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MarcheService {
  COSTANTE = CONSTANTS.API_URL 

  constructor() { }
}
