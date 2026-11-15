export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagenUrl: string;
  tiempoPreparacionMin: number;
  porciones: number;
  ingredientes: string[];
  pasos: string[];
  favorito: boolean;
}
