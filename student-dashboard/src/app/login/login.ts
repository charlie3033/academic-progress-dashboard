import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private http = inject(HttpClient);

  email = '';
  password = '';
  error = '';

  login() {
  this.http.post('http://localhost:3000/api/students/login', {
      email: this.email.trim(),
      password: this.password.trim()
  })
  .subscribe({
      next: (res: any) => {
        console.log("Login Response:", res);

        localStorage.setItem('student', JSON.stringify(res.student));

        this.router.navigate(['/dash']);
      },
      error: (err) => {
        this.error = err?.message || 'Login failed. Please try again.';
      }
  });
}

}
