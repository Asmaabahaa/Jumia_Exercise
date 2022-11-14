import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
public userListUrl = 'https://randomuser.me/api/?results=10';
public nationalityListUrl = this.userListUrl +'&nat=';
public downloadCsvUrl = 'https://randomuser.me/api/?format=csv';

  constructor(private http: HttpClient) { }

  getUserList(gender: string, nationality: any){
    if(gender){
      this.userListUrl =  this.userListUrl +'&gender=' + gender;
    }
    if(nationality){
      this.nationalityListUrl +=  nationality;
    }
    return this.http.get(this.userListUrl)
    .pipe(map(response => response));
  }

  downloadCSV(): Observable<any> {
    return this.http.get(this.downloadCsvUrl, {
      responseType: "text"
    });
  }
}
