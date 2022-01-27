import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gyan } from 'src/app/core/models/gyan';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  gyanForm: FormGroup;
  formValid: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private formBuilder: FormBuilder) {
    this.gyanForm = this.formBuilder.group({
      id: new FormControl(0, []),
      gyanId: new FormControl(0, []),
      status: new FormControl('', []),
      link: new FormControl('', []),
      myGyan: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required])
    })
  }
  userId: number = 0;
  gyanData: gyan[] = [];
  completeGyans: gyan[] = [];
  editText: boolean = false;
  meetingURL: string = "https://us05web.zoom.us/j/84336392244?pwd=cXZqYklKaUp5TzFyOFd1enBDNEswUT09";
  ngOnInit(): void {
    this.commonService.setComponentName('userPage');
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params.userId;
    })
    this.completeGyans = JSON.parse(this.commonService.getStorage('gyan') || '{}');
    this.gyanData = this.completeGyans.filter((x: gyan) => x.id == this.userId);
  }
  submitGyan() {
      var formData = this.gyanForm.value;
      if (this.gyanForm.invalid) {
        this.formValid = false;
      }
      else {
        if (formData.gyanId == 0 || formData.gyanId == null) {
          let id = this.completeGyans.reduce((initial: number, item: any) => initial = initial > item.gyanId ? initial : item.gyanId, 0);
          formData.gyanId = ++id;
          formData.id = this.userId;
          formData.status = "Pending";
          formData.link = "-";
          this.gyanData.push(formData);
          this.completeGyans.push(formData);
        }
        else {
          var gyanIndex = this.completeGyans.findIndex(x => x.gyanId == formData.gyanId);
          if (gyanIndex > -1) {
            var gyanArray = this.completeGyans[gyanIndex];
            gyanArray.myGyan = formData.myGyan;
            gyanArray.topic = formData.topic;
            gyanArray.startTime = formData.startTime;
            gyanArray.endTime = formData.endTime;
            this.completeGyans[gyanIndex] = gyanArray;
          }
          var gyanIndex = this.gyanData.findIndex(x => x.gyanId == formData.gyanId);
          if (gyanIndex > -1) {
            var gyanArray = this.gyanData[gyanIndex];
            gyanArray.myGyan = formData.myGyan;
            gyanArray.topic = formData.topic;
            gyanArray.startTime = formData.startTime;
            gyanArray.endTime = formData.endTime;
            this.gyanData[gyanIndex] = gyanArray;
          }
        }
        this.commonService.setStorage(JSON.stringify(this.completeGyans), 'gyan');
        this.formValid = true;
        this.gyanForm.reset();       
        // var button:any = document.getElementById("myModal");
        // button.style.display = "none";
        // var button:any = document.getElementById("gyanGrid");
        // button.style.display = "block";
      }
  }

  edit(gyan?: gyan) {
    if (gyan) {
      this.editText = true;
      this.gyanForm.controls['gyanId'].setValue(gyan.gyanId);
      this.gyanForm.controls['myGyan'].setValue(gyan.myGyan);
      this.gyanForm.controls['topic'].setValue(gyan.topic);
      this.gyanForm.controls['startTime'].setValue(new Date(gyan.startTime).toISOString().slice(0, 16));
      this.gyanForm.controls['endTime'].setValue(new Date(gyan.startTime).toISOString().slice(0, 16));
    }
    else {
      this.editText = false;
      this.gyanForm.reset();
    }
  }
}
