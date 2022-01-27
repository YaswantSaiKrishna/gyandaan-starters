import { CommonService } from './core/services/common.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GyanDaan';
  type: string ="";
  public subscription: Subscription | undefined;
  logoutModalFlag: string ='none';
  constructor(private commonService : CommonService,private cdf:ChangeDetectorRef,private router: Router,){
    this.subscription = this.commonService.getComponentName().subscribe(type => {
      this.type = type;
      cdf.detectChanges();
    })
  }

  ngOnInit(): void {
    if(this.commonService.getStorage('users') == null){
      this.commonService.setStorage(JSON.stringify(this.commonService.loginData),'users');
    }
    if(this.commonService.getStorage('gyan') == null){
      this.commonService.setStorage(JSON.stringify(this.commonService.gyanData),'gyan');
    }
  }
  logoutmodel(){
    this.logoutModalFlag = this.logoutModalFlag == 'none'? 'block' : 'none';
  }
  Logout(){
    this.router.navigate(["/home"]);
  }
}
