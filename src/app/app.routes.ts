import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [permissionGuard],
        data: { permission: 'dashboard' },
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
      },
      {
        path: 'face-detector',
        loadComponent: () => import('./features/face-detector/face-detector.component').then((m) => m.FaceDetectorComponent),
      },
      {
        path: 'conversion',
        loadComponent: () =>
          import('./features/conversion/conversion.component').then((m) => m.ConversionComponent),
        canActivate: [permissionGuard],
        data: { permission: 'conversion' },
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
        canActivate: [permissionGuard],
        data: { permission: 'profile' },
      },
      {
        path: 'components/forms',
        loadComponent: () =>
          import('./features/components/forms/forms.component').then((m) => m.FormsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'forms-access' },
      },
      {
        path: 'components/alerts',
        loadComponent: () =>
          import('./features/components/alerts/alerts.component').then((m) => m.AlertsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'alerts-access' },
      },
      {
        path: 'components/cards',
        loadComponent: () =>
          import('./features/components/cards/cards.component').then((m) => m.CardsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'cards-access' },
      },
      {
        path: 'components/tables',
        loadComponent: () =>
          import('./features/components/tables/tables.component').then((m) => m.TablesComponent),
        canActivate: [permissionGuard],
        data: { permission: 'tables-access' },
      },
      {
        path: 'components/buttons',
        loadComponent: () =>
          import('./features/components/buttons/buttons.component').then((m) => m.ButtonsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'buttons-access' },
      },
      {
        path: 'components/loaders',
        loadComponent: () =>
          import('./features/components/loaders/loaders.component').then((m) => m.LoadersComponent),
        canActivate: [permissionGuard],
        data: { permission: 'loaders-access' },
      },
      {
        path: 'components/accordion',
        loadComponent: () =>
          import('./features/components/accordion/accordion.component').then(
            (m) => m.AccordionComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'accordion-access' },
      },
      {
        path: 'components/autocomplete',
        loadComponent: () =>
          import('./features/components/autocomplete/autocomplete.component').then(
            (m) => m.AutocompleteComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'autocomplete-access' },
      },
      {
        path: 'components/chips',
        loadComponent: () =>
          import('./features/components/chips/chips.component').then((m) => m.ChipsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'chips-access' },
      },
      {
        path: 'components/select',
        loadComponent: () =>
          import('./features/components/select/select.component').then((m) => m.SelectComponent),
        canActivate: [permissionGuard],
        data: { permission: 'select-access' },
      },
      {
        path: 'components/multiselect-tree',
        loadComponent: () =>
          import('./features/components/multiselect-tree/multiselect-tree.component').then(
            (m) => m.MultiselectTreeComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'multiselect-tree-access' },
      },
      {
        path: 'components/calendar',
        loadComponent: () =>
          import('./features/components/calendar/calendar.component').then(
            (m) => m.CalendarComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'calendar-access' },
      },
      {
        path: 'components/file-uploads',
        loadComponent: () =>
          import('./features/components/file-uploads/file-uploads.component').then(
            (m) => m.FileUploadsComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'file-uploads-access' },
      },
      {
        path: 'components/drag-drop',
        loadComponent: () =>
          import('./features/components/drag-drop/drag-drop.component').then(
            (m) => m.DragDropComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'drag-drop-access' },
      },
      {
        path: 'components/grids',
        loadComponent: () =>
          import('./features/components/grids/grids.component').then((m) => m.GridsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'grids-access' },
      },
      {
        path: 'components/modal-popup',
        loadComponent: () =>
          import('./features/components/modal-popup/modal-popup.component').then(
            (m) => m.ModalPopupComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'modal-popup-access' },
      },
      {
        path: 'components/headers',
        loadComponent: () =>
          import('./features/components/headers/headers.component').then((m) => m.HeadersComponent),
        canActivate: [permissionGuard],
        data: { permission: 'headers-access' },
      },
      {
        path: 'components/footers',
        loadComponent: () =>
          import('./features/components/footers/footers.component').then((m) => m.FootersComponent),
        canActivate: [permissionGuard],
        data: { permission: 'footers-access' },
      },
      {
        path: 'components/sliders',
        loadComponent: () =>
          import('./features/components/sliders/sliders.component').then((m) => m.SlidersComponent),
        canActivate: [permissionGuard],
        data: { permission: 'sliders-access' },
      },
      {
        path: 'components/carousel-sliders',
        loadComponent: () =>
          import('./features/components/carousel-sliders/carousel-sliders.component').then(
            (m) => m.CarouselSlidersComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'carousel-sliders-access' },
      },
      {
        path: 'components/gallery',
        loadComponent: () =>
          import('./features/components/gallery/gallery.component').then((m) => m.GalleryComponent),
        canActivate: [permissionGuard],
        data: { permission: 'gallery-access' },
      },
      {
        path: 'components/portfolio',
        loadComponent: () =>
          import('./features/components/portfolio/portfolio.component').then(
            (m) => m.PortfolioComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'portfolio-access' },
      },
      {
        path: 'components/editors',
        loadComponent: () =>
          import('./features/components/editors/editors.component').then((m) => m.EditorsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'editors-access' },
      },

      {
        path: 'pages/not-found',
        loadComponent: () =>
          import('./features/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
        canActivate: [permissionGuard],
        data: { permission: 'not-found-page' },
      },
      {
        path: 'pages/timeline',
        loadComponent: () =>
          import('./features/components/timeline/timeline.component').then(
            (m) => m.TimelineComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'timeline-page' },
      },
      {
        path: 'file-manager',
        loadComponent: () =>
          import('./features/pages/file-manager/file-manager.component').then(
            (m) => m.FileManagerComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: 'file-manage' },
      },
    ],
  },
  
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  }
];
