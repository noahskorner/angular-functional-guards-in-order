import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { USER_SERVICE } from './user.service.token';
import { runGuardsInOrder } from './run-guards-in-order';

const isLoggedInGuard = () => {
  return inject(USER_SERVICE).isLoggedIn();
};

const isInRoleGuard = (role: string) => () => {
  return inject(USER_SERVICE).isInRole(role);
};

const isSuperAdminGuard = () => {
  return inject(USER_SERVICE).isSuperAdmin();
};

export const routes: Routes = [
  {
    path: 'page-1',
    canActivate: [isLoggedInGuard],
    loadComponent: () =>
      import('./page-1/page-1.component').then((m) => m.Page1Component),
  },
  {
    path: 'page-2',
    canActivate: [runGuardsInOrder(isLoggedInGuard, isInRoleGuard('student'))],
    loadComponent: () =>
      import('./page-2/page-2.component').then((m) => m.Page2Component),
  },
  {
    path: 'page-3',
    canActivate: [
      runGuardsInOrder(
        isLoggedInGuard,
        isInRoleGuard('student'),
        isSuperAdminGuard
      ),
    ],
    loadComponent: () =>
      import('./page-3/page-3.component').then((m) => m.Page3Component),
  },
];
