import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/core/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userData: any;
  formValid: boolean = true;

  constructor(private commonService: CommonService, private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      id: new FormControl(0, []),
      type: new FormControl('Student', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.userData = JSON.parse(this.commonService.getStorage('users') || '{}');
  }
  submitRegister(){
    const matchedRecord = this.userData.find((x:user) => x.email == this.registerForm.value.email);
    if(this.registerForm.invalid){
      this.formValid = false;
    }
    else{
      if(matchedRecord != null){
        alert("Email already in use");
      }
      else{
        var formData = this.registerForm.value;
        if(formData.password == formData.confirmPassword){
          delete formData.confirmPassword;
        let id = this.userData.reduce((initial:number, item:any) => initial = initial > item.id ? initial : item.id, 0);
        formData.id = ++id;
        this.userData.push(formData);
        this.commonService.setStorage(JSON.stringify(this.userData),'users');
        alert("You are successfully registered.");
      }
    }
      this.formValid = true;
      this.registerForm.reset();
      this.registerForm.controls['type'].setValue('Student');
    }
  }

}
