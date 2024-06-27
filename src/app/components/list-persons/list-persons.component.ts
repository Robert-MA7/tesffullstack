import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/interfaces/person';
import { ProductService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListProductsComponent implements OnInit {
  listPerson: Person[] = []
  loading: boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListPerson();
  }

  getListPerson() {
    this.loading = true;
    this.listPerson = [
      { id: 1, nombre: "Robert", apellido: "Martin", fechaNacimiento: "04/09/1986", puesto: "programmer", sueldo:10},
    ];
      this.loading = false;

  }

  deletePerson(id: number) {
    this.loading = true;
    this._productService.deletePerson(id).subscribe(() => {
      this.getListPerson();
      this.toastr.warning('La persona fue eliminada con exito', 'Persona eliminada');
    })
    this.loading = false;
  }
}
