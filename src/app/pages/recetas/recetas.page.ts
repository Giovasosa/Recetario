import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Receta } from '../../models/receta.model';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  standalone: false,
})
export class RecetasPage implements OnInit {
  // el "!" es para avisarle a TS que esto se llena después, en ngOnInit
  recetas$!: Observable<Receta[]>;
  categoriaActiva: string | null = null;

  // Angular inyecta las instancias solo con ponerlas en el constructor
  constructor(
    private recetasService: RecetasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // se ejecuta una vez al crear la página, acá arranca todo
  ngOnInit() {
    // queryParamMap avisa cada vez que cambia el query param de la URL
    this.recetas$ = this.route.queryParamMap.pipe(
      // switchMap: cuando cambia la categoría, "salto" a traer esas recetas
      switchMap((params) => {
        const categoria = params.get('categoria');
        this.categoriaActiva = categoria;
        return categoria
          ? this.recetasService.getRecetasPorCategoria(categoria)
          : this.recetasService.getRecetas();
      })
    );
  }

  limpiarFiltro() {
    this.router.navigate(['/tabs/recetas']);
  }

  toggleFavorito(receta: Receta) {
    this.recetasService.toggleFavorito(receta.id);
  }
}
