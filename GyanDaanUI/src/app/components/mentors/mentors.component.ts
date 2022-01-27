import { gyan } from 'src/app/core/models/gyan';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/core/models/user';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {
  gyanData:gyan[] = [];
  daanData:gyan[] = [];
  UsersList:user[] = [];
  userId: number = 0;
  sendMailData: any=[];
  TotalGyans:gyan[] = [];
  filterDatadaan: gyan[]=[];
  filterDatagyan:gyan[]=[];

  constructor(private commonService: CommonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.commonService.setComponentName('userPage');
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params.userId;
    })
    this.TotalGyans = JSON.parse(this.commonService.getStorage('gyan') || '{}');
    this.gyanData =  this.TotalGyans.filter((x: gyan) => x.status != 'Accepted');
    this.filterDatagyan = this.gyanData;
    this.daanData = this.TotalGyans.filter((x: gyan) => x.daanId == this.userId);
    this.filterDatadaan = this.daanData;
  }
  submitInterest(gyan:gyan){
    const confirmGyan = confirm('Are you sure. You want to accept this Gyan ?');
    if(confirmGyan == true){
      gyan.daanId = this.userId;
      var mentorDetails = JSON.parse(this.commonService.getStorage('users') || '{}').find((x: user) => x.id == gyan.daanId);
      var studentDetails = JSON.parse(this.commonService.getStorage('users') || '{}').find((x: user) => x.id == gyan.id);
      gyan.status = "Accepted";
      gyan.link = 'https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09';
      var sendDetails = {
        mentorEmail : mentorDetails.email,
        studentEmail : studentDetails.email,
        myGyan : gyan.myGyan,
        topic:gyan.topic,
        startTime:gyan.startTime,
        endTime:gyan.endTime,
        link:gyan.link
      }
      this.sendMailData.push(sendDetails);
      this.commonService.SentMail(this.sendMailData).subscribe(res => {
        alert("Your meeting has been scheduled successfully.");
      }
      );
      this.daanData.push(gyan);
      var index = this.TotalGyans.findIndex(x=>x.gyanId == gyan.gyanId);
      this.TotalGyans[index] = gyan;
      this.commonService.setStorage(JSON.stringify(this.TotalGyans),'gyan');
      const gyanIndex = this.gyanData.findIndex(x => x.gyanId == gyan.gyanId);
      this.gyanData.splice(gyanIndex,1);
    }
  }

  submitToJoin(){
    window.open("https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09");
  }
  searchgyan(term: any) {
    if(term.target.value =="") {
      this.filterDatagyan = this.gyanData;
    } else {
      this.filterDatagyan = this.gyanData.filter(x => 
         (x.myGyan?.trim().toLowerCase().includes(term.target.value.trim().toLowerCase()) || x.topic?.trim().toLowerCase().includes(term.target.value.trim().toLowerCase()))
      );
    }
  }
  searchdaan(term: any) {
    if(term.target.value =="") {
      this.filterDatadaan = this.daanData;
    } else {
      this.filterDatadaan = this.daanData.filter(x => 
         (x.myGyan?.trim().toLowerCase().includes(term.target.value.trim().toLowerCase()) || x.topic?.trim().toLowerCase().includes(term.target.value.trim().toLowerCase()))
      );
    }
  }
}
