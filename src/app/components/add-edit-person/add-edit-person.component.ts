import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/interfaces/person';
import { ProductService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.component.html',
  styleUrls: ['./add-edit-person.component.css']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getPerson(this.id);
    }
  }

  getPerson(id: number) {
    this.loading = true;
    this._productService.getPerson(id).subscribe((data: Person) => {
      this.loading = false;
      this.form.setValue({
        name: data.nombre,
        description: data.apellido,
        fecha: data.fechaNacimiento,
        puesto: data.puesto,
        sueldo: data.sueldo
      })
    })
  }

  addPerson() {

    const person: Person = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fechaNacimiento: this.form.value.fechaNacimiento,
      puesto: this.form.value.puesto,
      sueldo: this.form.value.sueldo
    }

    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      person.id = this.id;
      this._productService.updatePerson(this.id, person).subscribe(() => {
        this.toastr.info(`La persona ${person.nombre} fue actualizada con exito`, 'Persona actualizada');
        this.loading = false;
        this.router.navigate(['/']);
      })
    } else {
      // Es agregar
      this._productService.savePerson(person).subscribe(() => {
        this.toastr.success(`La Persona ${person.nombre} fue registrada con exito`, 'Persona registrada');
        this.loading = false;
        this.router.navigate(['/']);
      })
      this.loading = false;
    }




  }

}
