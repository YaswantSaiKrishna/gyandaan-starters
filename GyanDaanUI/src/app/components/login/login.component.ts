import { user } from './../../core/models/user';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = '';
  loginFormLabel: string = '';
  imageURL: string = '';
  loginForm: FormGroup;
  formvalid: boolean = true;
  passwordIncorrect: boolean = false;
  emailIncorrect: boolean = false;
  loggedinUser: user = {};
  //loggedinUser:user;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private commonService: CommonService) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.loginTypeCheck();
  }

  loginTypeCheck() {
    this.activatedroute.queryParams.subscribe(params => {
      this.type = params.type;
    })
    if (this.type == 'student') {
      this.loginFormLabel = 'Student';
      this.imageURL = "assets/img/4529183.jpg";
    }
    else {
      this.loginFormLabel = 'Mentor';
      this.imageURL = "assets/img/18915856.jpg";
    }
  }

  loginSubmit() {
    if (this.loginForm.invalid) {
      this.formvalid = false;
    }
    else {
      const user = this.loginForm.value;
      this.loggedinUser = JSON.parse(this.commonService.getStorage('users') || '{}').find((x: user) => x.email == user.email);
      if (this.loggedinUser != null){
        if(this.loggedinUser.password == user.password){
          if(this.loggedinUser.type == 'Student'){
          this.router.navigateByUrl('/student?userId='+ this.loggedinUser.id);
          }
          else{
          this.router.navigateByUrl('/mentor?userId='+ this.loggedinUser.id);
          }
        }
        else{
          alert("Password incorrect");
        }
      }
      else{
        alert("Email incorrect");
      }
    }
  }

}
