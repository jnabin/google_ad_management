import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { TranslationResolver } from './resolver/translation.resolver';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./components/agency-profile/agency-profile.component').then(x => x.AgencyProfileComponent),
                data: { module: 'agency-profile' },
                resolve: { translations: TranslationResolver }
            },
            {
                path: 'agency-profile',
                loadComponent: () => import('./components/agency-profile/agency-profile.component').then(x => x.AgencyProfileComponent),
                data: { module: 'agency-profile' },
                resolve: { translations: TranslationResolver }
            },
            {
                path: 'invoice',
                loadComponent: () => import('./components/invoice/invoice.component').then(x => x.InvoiceComponent),
                data: { module: 'invoice' },
                resolve: { translations: TranslationResolver }
            },
            {
                path: 'agency-team',
                loadComponent: () => import('./components/agency-team/agency-team.component').then(x => x.AgencyTeamComponent),
                data: { module: 'agency-team' },
                resolve: { translations: TranslationResolver }
            },
            {
                path: 'subscription-plan',
                loadComponent: () => import('./components/subscription-plan/subscription-plan.component').then(x => x.SubscriptionPlanComponent),
                data: {module: 'subscription-plan'},
                resolve: {translations: TranslationResolver}
            },
            {
                path: 'subscription-plan-admin',
                loadComponent: () => import('./components/subscription-plan-admin-new/subscription-plan-admin-new.component').then(x => x.SubscriptionPlanAdminNewComponent),
                data: {module: 'subscription-plan-admin'},
                resolve: {translations: TranslationResolver}
            },
            {
                path: 'subscription-plan-admin-old',
                loadComponent: () => import('./components/subscription-plan-admin/subscription-plan-admin.component').then(x => x.SubscriptionPlanAdminComponent),
                data: {module: 'subscription-plan-admin'},
                resolve: {translations: TranslationResolver}
            },
        ]
    }
];
