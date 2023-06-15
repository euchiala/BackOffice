import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    const objectToSubmit = { ...this.form.value};
    // Pass the username and password to the login service
    this.loginService.login(objectToSubmit).subscribe(
      (response) => {
        // Handle the login success logic here
        localStorage.setItem('token', response.token);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        // Handle the login error logic here
        console.error(error);
      }
    );
  }
}
