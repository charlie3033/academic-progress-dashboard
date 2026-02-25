import { CommonModule } from '@angular/common';
import { Component, inject,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  roll = '';
  password = '';
  error = '';


  fp_email = "";
  newPass = "";
  confirmPass = "";
  step = 1;

  showOtp = false;
  otp:string = "";
  maskemail:string ='';
  resendTimer:number=0;
  timerInterval:any;
  isLoading=false;
  isResending = false;
  showForgot = false;


  login() {
    this.http.post(`${environment.apiUrl}/students/login`, {
        roll: this.roll.trim(),
        password: this.password.trim()
    })
    .subscribe({
        next: (res: any) => {
          console.log("Login Response:", res);
          localStorage.setItem('student', JSON.stringify(res.student));
          this.router.navigate(['/dash']);
        },
        error: (err) => {
          console.log(err);
          alert("Invalid Credentials!");
          this.error = err?.message || 'Login failed. Please try again.';
        }
    });
  }

  openForgot() {
    this.showForgot = true;
  }

  closeForgot() {
    this.showForgot = false;
  }

  sendOtp() {
    this.http.post(`${environment.apiUrl}/otp/send-otp`, { email: this.fp_email })
      .subscribe(() => {
        alert("OTP sent to email!");
        this.step = 2;
      });
  }

  verifyOtp() {
    this.http.post(`${environment.apiUrl}/otp/verify-otp`, { email: this.fp_email, otp: this.otp })
      .subscribe((res: any) => {
        if(res.valid) {
          this.step = 3;
        } else { alert("Invalid OTP"); }
      });
  }

  changePassword() {
    if(this.newPass !== this.confirmPass) return alert("Passwords do not match");

    this.http.post(`${environment.apiUrl}/otp/reset-password`, { email: this.fp_email, password: this.newPass })
      .subscribe(() => {
        alert("Password Updated!");
        this.closeForgot();
      });
  }

  goBack() {
    this.showOtp = false;
    this.otp = '';        // clear OTP field
    this.isLoading = false; // reset loading state
    clearInterval(this.timerInterval);
    this.cdr.detectChanges();
    window.location.reload();
  }
  goBackToForgot() {
    this.showOtp = false;
    this.otp = '';        // clear OTP field
    this.isLoading = false;
    clearInterval(this.timerInterval);
    this.showForgot = true;
    this.cdr.detectChanges();
  }

  sendResetLink() {
    this.http.post(`${environment.apiUrl}/students/send-reset-link`, { roll: this.roll })
    .subscribe({
      next: () => {
        alert("Reset link sent to your email!");
        this.showForgot = false;
        this.cdr.detectChanges();
      },
      error: () => {
        alert("Error sending reset link. Please try again.");
        // this.cdr.detectChanges();
      }
    })
  }


}
