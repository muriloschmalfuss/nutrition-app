import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/types/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  serviceSub = new Subscription()

  registerForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  })

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
  }

  onSubmit() {
    this.serviceSub = this.authService.register(this.registerForm.getRawValue() as User).subscribe((resp) => {
      this.snackBar.open('Sucesso', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/auth']);
    }, (err) => {
      this.snackBar.open('Erro', 'Close', {
        duration: 3000
      });
    })
  }

}
