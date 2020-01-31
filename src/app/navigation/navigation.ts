import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
        {
                id       : 'profile',
                title    : 'Profile',
                translate: 'Profile',
                type     : 'item',
                icon     : 'person',
                url      : '/apps/profile'
            },


        {
                id       : 'account',
                title    : 'Account',
                translate: 'Account',
                type     : 'collapsable',
                icon     : 'person',
                children : [
                    {
                        id: 'about',
                        title: 'Edit',
                        type: 'item',
                        url: '/apps/account/edit'

                    }



                ]

            },

            {
                id       : 'products',
                title    : 'Products',
                translate: 'Products',
                type     : 'item',
                icon     : 'person',
                url      :  '/apps/products/products'
                
            }

 ]