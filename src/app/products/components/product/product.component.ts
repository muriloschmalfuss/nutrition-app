import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../shared/types/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  ngOnInit() {
  }

}
