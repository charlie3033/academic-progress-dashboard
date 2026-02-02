
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username='';
  password='';
  constructor(private http: HttpClient,private router: Router){}

  onSubmit(){
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(`${environment.apiUrl}/admin/login`, credentials).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('adminname',this.username);
        this.router.navigate(['/admin/dashboard']);
      },error: ()=>{
        alert('Invalid credentials');
      }
    });
  }
}
