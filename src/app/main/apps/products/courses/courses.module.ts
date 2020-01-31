import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { CoursesComponent } from 'app/main/apps/products/courses/courses.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewCourseDialog } from 'app/main/apps/products/courses/courses.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes = [
    {
        path     : '**',
        component: CoursesComponent,
    }
];

@NgModule({
    declarations: [
        CoursesComponent,
        NewCourseDialog
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatDialogModule,
        FuseSharedModule
    ],

    entryComponents: [NewCourseDialog]
})
export class CoursesModule
{
}
