import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

// '**' keeps the MFE quiet about URLs it doesn't own (other counters' tiles)
export const routes: Routes = [{ path: '**', component: EmptyRouteComponent }];
