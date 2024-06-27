import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListProductsComponent } from './components/list-persons/list-persons.component';
import { AddEditProductComponent } from './components/add-edit-person/add-edit-person.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:id', component: AddEditProductComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
