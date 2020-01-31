import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/apps/profile/profile.service';
import { ProfileComponent } from 'app/main/apps/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/apps/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/apps/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/apps/profile/tabs/photos-videos/photos-videos.component';


const routes = [
    {
        path     : '**',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
