import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/types/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  serviceSub = new Subscription()

  loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  })

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/products'])
    }
  }

  onSubmit() {
    this.serviceSub = this.authService.login(this.loginForm.getRawValue() as User).subscribe(
      (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/products'])
      },
      (err) => {
        this.snackBar.open('Usuário e/ou senha errados!', 'Close', {
          duration: 3000
        })
      }
    )
  }

  goToRegister() {
    this.router.navigate(['/auth/register'])
  }
}
