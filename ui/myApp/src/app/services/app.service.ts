import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/constant';
import { Video } from '../../models/video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  public getAllTutorials() : Observable<Video[]>{
    return this.http.get<Video[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_TUTORIALS);
  }
}
