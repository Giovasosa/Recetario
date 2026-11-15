import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaResumen, RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: false,
})
export class CategoriasPage implements OnInit {
  categorias$!: Observable<CategoriaResumen[]>;

  // Router sirve para navegar desde código, no solo con un link en el HTML
  constructor(private recetasService: RecetasService, private router: Router) {}

  ngOnInit() {
    this.categorias$ = this.recetasService.getCategoriasConCantidad();
  }

  verRecetas(categoria: string) {
    // voy a Recetas pero le mando la categoría como parámetro en la URL
    this.router.navigate(['/tabs/recetas'], { queryParams: { categoria } });
  }
}
