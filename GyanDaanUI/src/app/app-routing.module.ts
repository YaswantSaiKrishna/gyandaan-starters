import { StudentsComponent } from './components/students/students.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MentorsComponent } from './components/mentors/mentors.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'mentor', component: MentorsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student', component: StudentsComponent },
  { path: 'login', component: LoginComponent },
  { path: "**", redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
