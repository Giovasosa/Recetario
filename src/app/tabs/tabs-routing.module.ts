import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recetas',
        loadChildren: () => import('../pages/recetas/recetas.module').then(m => m.RecetasPageModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('../pages/categorias/categorias.module').then(m => m.CategoriasPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/recetas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/recetas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
