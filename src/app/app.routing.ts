import { RouterModule, Routes } from '@angular/router';

import { DetailsSubpanelComponent } from './details-subpanel/details-subpanel.component';
import { SearchSubpanelComponent } from './search-subpanel/search-subpanel.component';


const routes: Routes = [
  // { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchSubpanelComponent },
  { path: 'food-hub/:id', component: DetailsSubpanelComponent },
];

export const AppRoutesModule = RouterModule.forRoot(routes);
