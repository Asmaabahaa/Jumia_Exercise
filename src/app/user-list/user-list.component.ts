import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { faMars, faVenus, faEnvelope, faPhone, faLocationDot, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
public userList:any;
public nationalityList = ["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IN", "IR", "MX", "NL", "NO", "NZ", "RS", "TR", "UA", "US"]
// FontAwesome declarations:
  faMars = faMars;
  faVenus = faVenus;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocationDot = faLocationDot;
  faHashtag = faHashtag;

  //  dateSinceRegistration = new Date(this.userList[0].registered.date);
  //  todaysDate = new Date();
  //  registrationSeniority = this.todaysDate.valueOf() - this.dateSinceRegistration.valueOf();
  //  registerPeriod!: string;

  gender: any;
  nationality: any;
  selected: any;
  constructor(
    public UserDataService: UserDataService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.getUserList(this.gender, this.nationality);
  }

//   getFormatedStringFromDays(date : number) {
//     var years = Math.floor(date / 365);
//     var months = Math.floor(date % 365 / 30);
//     var days = Math.floor(this.registrationSeniority % 365 % 30);
//     console.log([years, months, days].join(':'))
//     return this.registerPeriod = [years + 'years' , months + 'months', days + 'days'].join(' ');
// }

getUserList(gender: string, nationality:any){
  this.UserDataService.getUserList(gender, nationality)
  .subscribe(
    (data: any) => {
        this.userList = data.results; 
    });
}

filterBy(gender : string, nationality : any){
  this.getUserList(gender, nationality);
}

downloadCSV(): void {
  this.UserDataService.downloadCSV().subscribe((buffer) => {
    const data: Blob = new Blob([buffer], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(data, "userlist.csv");
  });
}
}
