import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private service = inject(StudentService);
  private router = inject(Router);
  private http = inject(HttpClient);

  email = '';
  password = '';
  error = '';

  async login() {
    // this.service.loginStudent({ email: this.email, password: this.password })
    //   .subscribe({
    //     next: res => {
    //       localStorage.setItem('studentToken', res.token);
    //       this.router.navigate(['/profile']);
    //     },
    //     error: err => this.error = err.error?.message || 'Login failed'
    //   });

      try{
        const res:any = await this.http.post('http://localhost:3000/api/students/login', {
          email: this.email.trim(),
          password: this.password.trim()
        }).toPromise();

        if(!res || !res.student){
          alert("InValid Credentials");
          throw new Error('Invalid Login Credentials');
        }

        localStorage.setItem('student',JSON.stringify(res.student));

        this.router.navigate(['/dash']);
      }catch(err: any){
        this.error = err?.message || 'Login failed. Please Try again.';
      }


  }
}
