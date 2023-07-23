import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/types/product";
import {Subscription, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'calories', 'total_fat', 'cholesterol', 'sodium', 'total_carbohydrate', 'protein', 'actions'];
  products: Product[] = [];
  serviceSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.serviceSub.unsubscribe();
  }

  getProducts() {
    this.serviceSub = this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
    })
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).pipe(take(1))
      .subscribe(() => {
        this.snackBar.open('Sucesso', 'Close', {
          duration: 3000
        });
        this.getProducts();
      });
  }

  goToAddProduct() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
