import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/types/product";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'calories', 'total_fat', 'cholesterol', 'sodium', 'total_carbohydrate', 'protein'];
  products: Product[] = [];
  serviceSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
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

  goToAddProduct() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
