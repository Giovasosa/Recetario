import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receta } from '../models/receta.model';

export interface CategoriaResumen {
  nombre: string;
  cantidad: number;
}

const RECETAS_MOCK: Receta[] = [
  {
    id: 1,
    nombre: 'Milanesas a la napolitana',
    descripcion: 'Milanesas de ternera cubiertas con jamón, salsa de tomate y queso gratinado.',
    categoria: 'Carnes',
    imagenUrl: 'https://picsum.photos/seed/milanesa/400/300',
    tiempoPreparacionMin: 45,
    porciones: 4,
    ingredientes: ['4 milanesas de ternera', 'Jamón cocido', 'Salsa de tomate', 'Queso muzzarella'],
    pasos: ['Freír las milanesas', 'Cubrir con jamón y salsa', 'Agregar queso y gratinar al horno'],
    favorito: false,
  },
  {
    id: 2,
    nombre: 'Tarta de verduras',
    descripcion: 'Tarta salada con acelga, cebolla y huevo sobre masa casera.',
    categoria: 'Vegetariano',
    imagenUrl: 'https://picsum.photos/seed/tarta/400/300',
    tiempoPreparacionMin: 60,
    porciones: 6,
    ingredientes: ['Masa para tarta', 'Acelga', 'Cebolla', '3 huevos', 'Queso rallado'],
    pasos: ['Rehogar la verdura', 'Mezclar con huevo y queso', 'Hornear hasta dorar'],
    favorito: false,
  },
  {
    id: 3,
    nombre: 'Ensalada César',
    descripcion: 'Lechuga, pollo grillado, croutons y aderezo César.',
    categoria: 'Ensaladas',
    imagenUrl: 'https://picsum.photos/seed/cesar/400/300',
    tiempoPreparacionMin: 20,
    porciones: 2,
    ingredientes: ['Lechuga romana', 'Pechuga de pollo', 'Croutons', 'Aderezo César', 'Queso parmesano'],
    pasos: ['Grillar el pollo y cortarlo', 'Mezclar la lechuga con el aderezo', 'Agregar pollo, croutons y queso'],
    favorito: false,
  },
  {
    id: 4,
    nombre: 'Flan casero',
    descripcion: 'Flan de huevo con dulce de leche y crema.',
    categoria: 'Postres',
    imagenUrl: 'https://picsum.photos/seed/flan/400/300',
    tiempoPreparacionMin: 90,
    porciones: 8,
    ingredientes: ['6 huevos', 'Leche', 'Azúcar', 'Esencia de vainilla'],
    pasos: ['Batir los huevos con azúcar y leche', 'Volcar en budinera acaramelada', 'Cocinar a baño de maría'],
    favorito: false,
  },
  {
    id: 5,
    nombre: 'Risotto de hongos',
    descripcion: 'Arroz cremoso con hongos de pino y parmesano.',
    categoria: 'Pastas y arroces',
    imagenUrl: 'https://picsum.photos/seed/risotto/400/300',
    tiempoPreparacionMin: 40,
    porciones: 3,
    ingredientes: ['Arroz arborio', 'Hongos de pino', 'Caldo de verduras', 'Queso parmesano', 'Vino blanco'],
    pasos: ['Rehogar los hongos', 'Agregar el arroz y el vino', 'Incorporar caldo de a poco y revolver hasta cocción'],
    favorito: false,
  },
];

// 'root' = un solo service para toda la app, Angular lo crea una vez y lo reparte
@Injectable({ providedIn: 'root' })
export class RecetasService {
  // guarda las recetas actuales y avisa a todos cuando cambian
  private recetas$ = new BehaviorSubject<Receta[]>(RECETAS_MOCK);

  getRecetas(): Observable<Receta[]> {
    // asObservable() = lo dejo solo para que lo lean, no para que lo modifiquen
    return this.recetas$.asObservable();
  }

  getCategoriasConCantidad(): Observable<CategoriaResumen[]> {
    // pipe + map: cada vez que cambian las recetas, recalculo el resumen solo
    return this.recetas$.pipe(
      map((recetas) => {
        const categorias = recetas.map((r) => r.categoria);
        const nombresUnicos = [...new Set(categorias)]; // sin repetidos
        return nombresUnicos.map((nombre) => ({
          nombre,
          cantidad: recetas.filter((r) => r.categoria === nombre).length,
        }));
      })
    );
  }

  getRecetasPorCategoria(categoria: string): Observable<Receta[]> {
    return this.recetas$.pipe(
      map((recetas) => recetas.filter((r) => r.categoria === categoria))
    );
  }

  toggleFavorito(id: number): void {
    // hago una copia del array (no lo toco directo), si no Angular no se entera del cambio
    const actualizadas = this.recetas$.value.map((r) =>
      r.id === id ? { ...r, favorito: !r.favorito } : r
    );
    this.recetas$.next(actualizadas);
  }
}
