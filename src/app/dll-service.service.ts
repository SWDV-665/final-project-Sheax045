import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/observable"
import {map, catchError  }  from "rxjs/operators"

import { Subject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class DllServiceService {

  baseUrl = "http://localhost:8080";

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    console.log("Hello DllServiceProvider Provider");
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

  addItem(item){
    this.http.post(this.baseUrl + '/api/dll',item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true)
    })
  }

  getItems(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dll').pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

}

  