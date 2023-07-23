import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {NgModule} from "@angular/core";
import {FormComponent} from "./components/form/form.component";
import {authGuard} from "../shared/guard/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add',
    component: FormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: FormComponent,
    canActivate: [authGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule {
}
