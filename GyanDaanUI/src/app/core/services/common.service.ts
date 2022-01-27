import { gyan } from './../models/gyan';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { user } from '../models/user';
import { HttpHeaders } from '@angular/common/http';  
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  url = 'http://localhost:8270/SendMail';  
  private selectedComponent = new Subject<string>();
  constructor(private http: HttpClient) { }
  public getComponentName(): Observable<string> {
    return this.selectedComponent.asObservable();
  }
  public setComponentName(component: string): void {
    this.selectedComponent.next(component);
  }
   loginData:user[]=[{
    id: 1,
    type:'Student',
    email:'praveenkumar.suggula0@gmail.com',
    password:'abc123'
  },
  {
    id: 2,
    type:'Student',
    email:'praveenkumar.suggula0@gmail.com',
    password:'xyz123'
  },
  {
    id: 3,
    type:'Mentor',
    email:'sahithilakshmi9898@gmail.com',
    password:'efg123'
  },
  {
    id: 4,
    type:'Mentor',
    email:'sahithilakshmi9898@gmail.com',
    password:'efg123'
  }
];


  gyanData : gyan[] =[
  {
  id: 1, // foreign key for posted student members
  gyanId: 1, // primary key for each record
  daanId: 3, // foreign key for mentor accepted data
  myGyan:'I have a question in linear algebra',
  topic: 'Maths',
  status:'Accepted',
  startTime:'2018-06-12T19:30',
  endTime:'2022-01-03T06:24',
  link:'https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09'
},
{
  id: 1,
  gyanId: 2,
  daanId: 4,
  myGyan:'I have a question in physics',
  topic: 'Science',
  status:'Accepted',
  startTime:'2022-01-03T06:24',
  endTime:'2022-01-03T06:24',
  link:'https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09'
},
{
  id: 1,
  gyanId: 3,
  daanId: 3,
  myGyan:'I have a question in chemistry',
  topic: 'Science',
  status:'Pending',
  startTime:'2022-01-03T06:24',
  endTime:'2022-01-03T06:24',
  link:'-'
},
{
  id: 1,
  gyanId: 4,
  daanId: 3,
  myGyan:'I have a question in geometry',
  topic: 'Maths',
  status:'Accepted',
  startTime:'2022-01-03T06:24',
  endTime:'2022-01-03T06:24',
  link:'https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09'
},
{
  id: 2,
  gyanId: 5,
  daanId: 4,
  myGyan:'I have a question in social',
  topic: 'Social',
  status:'Pending',
  startTime:'2022-01-03T06:24',
  endTime:'2022-01-03T06:24',
  link:'-'
},
{
  id: 2,
  gyanId: 6,
  daanId: 4,
  myGyan:'I have a question in English',
  topic: 'English',
  status:'Accepted',
  startTime:'2022-01-03T06:24',
  endTime:'2022-01-03T06:24',
  link:'https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09'
},
{
  id: 2,
  gyanId: 7,
  daanId: 4,
  myGyan:'I have a question in civics',
  topic: 'Social',
  status:'Pending',
  startTime:'2022-01-03T06:24',
  endTime:'2022-01-03T06:24',
  link:'-'
},
{
  id: 2,
  gyanId: 8,
  daanId: 3,
  myGyan:'I have a question in english',
  topic: 'English',
  status:'Accepted',
  startTime:'2022-01-03T06:24',
  endTime:'2022-01-03T06:24',
  link:'https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09'
}
];
  setStorage(obj: any, key: string) {
    localStorage.setItem(key, obj);
  }
  getStorage(key: string) {
    return localStorage.getItem(key);
  }

  SentMail(sendMailData: any) {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<any>(this.url,  
    sendMailData, httpOptions); 
  }  
}
