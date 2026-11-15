import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../../models/receta.model';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit {
  favoritos$!: Observable<Receta[]>;

  constructor(private recetasService: RecetasService) {}

  ngOnInit() {
    this.favoritos$ = this.recetasService.getFavoritos();
  }

  toggleFavorito(receta: Receta) {
    this.recetasService.toggleFavorito(receta.id);
  }
}
