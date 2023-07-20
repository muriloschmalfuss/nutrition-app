import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  serviceSub: Subscription = new Subscription();

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
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
}
