import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Receta } from '../models/receta.model';

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

@Injectable({ providedIn: 'root' })
export class RecetasService {
  private recetas$ = new BehaviorSubject<Receta[]>(RECETAS_MOCK);

  getRecetas(): Observable<Receta[]> {
    return this.recetas$.asObservable();
  }

  getCategorias(): string[] {
    const categorias = this.recetas$.value.map((r) => r.categoria);
    return [...new Set(categorias)];
  }

  toggleFavorito(id: number): void {
    const actualizadas = this.recetas$.value.map((r) =>
      r.id === id ? { ...r, favorito: !r.favorito } : r
    );
    this.recetas$.next(actualizadas);
  }
}
