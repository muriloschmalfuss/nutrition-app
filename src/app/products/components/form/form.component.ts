import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {Subscription} from "rxjs";
import {Product} from "../../../shared/types/product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  serviceSub = new Subscription();

  constructor(private productService: ProductService, private snackBar: MatSnackBar, private router: Router) {
  }

  productFrom = new FormGroup({
    name: new FormControl<string>(''),
    calories: new FormControl<number>(0),
    total_fat: new FormControl<number>(0),
    cholesterol: new FormControl<number>(0),
    sodium: new FormControl<number>(0),
    total_carbohydrate: new FormControl<number>(0),
    protein: new FormControl<number>(0)
  })

  onSubmit() {
    this.serviceSub = this.productService.addProduct(this.productFrom.getRawValue() as Product).subscribe(
      (response) => {
        this.snackBar.open('Sucesso', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/products'])
      },
      (err) => {
        this.snackBar.open('Error', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
