import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {NgModule} from "@angular/core";
import {FormComponent} from "./components/form/form.component";


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: FormComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule {
}
