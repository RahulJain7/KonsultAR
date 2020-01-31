import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FuseSharedModule } from '@fuse/shared.module';

import { CoursesComponent } from 'app/main/apps/products/courses/courses.component';
import { FuseSidebarModule } from '@fuse/components';
import { NewCourseDialog } from 'app/main/apps/products/courses/courses.component';
const routes = [
    {
        path     : '**',
        component: CoursesComponent,
    },
];

@NgModule({
    declarations: [
        CoursesComponent,
        NewCourseDialog
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        FuseSharedModule,
        FuseSidebarModule
    ],
    entryComponents: [NewCourseDialog]
})
export class CourseModule
{
}
