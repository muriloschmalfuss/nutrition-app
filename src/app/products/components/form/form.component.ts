import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {Subscription} from "rxjs";
import {Product} from "../../../shared/types/product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  serviceSub = new Subscription();
  editMode = false;
  productId!: number;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  productFrom = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    calories: new FormControl<number | null>(null),
    total_fat: new FormControl<number | null>(null),
    cholesterol: new FormControl<number | null>(null),
    sodium: new FormControl<number | null>(null),
    total_carbohydrate: new FormControl<number | null>(null),
    protein: new FormControl<number | null>(null)
  })

  ngOnInit() {
    this.verifyRoute();
  }

  verifyRoute() {
    if (this.route.routeConfig?.path?.includes('edit')) {
      this.editMode = true;
      this.productId = this.route.snapshot.params['id'];
      this.getProductById();
    }
  }

  getProductById() {
    this.serviceSub = this.productService.getProduct(this.productId).subscribe((resp) => {
      this.productFrom.patchValue({ ...resp })
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.serviceSub = this.productService.editProduct(this.productId, this.productFrom.getRawValue() as Product).subscribe(
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
    } else {
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
}
