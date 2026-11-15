import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../../models/receta.model';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  standalone: false,
})
export class RecetasPage implements OnInit {
  recetas$!: Observable<Receta[]>;

  constructor(private recetasService: RecetasService) {}

  ngOnInit() {
    this.recetas$ = this.recetasService.getRecetas();
  }

  toggleFavorito(receta: Receta) {
    this.recetasService.toggleFavorito(receta.id);
  }
}
