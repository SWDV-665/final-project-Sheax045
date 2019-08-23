import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'HomeTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../HomeTab/home').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'EventsTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../EventsTab/event.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'ContactTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ContactTab/Contact').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/HomeTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/HomeTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
