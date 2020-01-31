import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
    },

    {
        path        : 'auth/login',
        loadChildren: './authentication/login/login.module#LoginModule'
    },

    {
        path        : 'auth/register',
        loadChildren: './authentication/register/register.module#RegisterModule'
    },
    {

        path        : 'account/edit',
        loadChildren: './account/edit/edit.module#EditModule'
    },
    {

        path        : 'products',
        loadChildren: './products/products.module#ProductsModule'
    },

    {

        path        : 'courses',
        loadChildren: './products/course.module#CourseModule'
    }

   
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}
