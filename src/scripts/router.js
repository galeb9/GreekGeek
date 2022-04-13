import { createRouter, createWebHistory } from 'vue-router';

import TheGoal from '@/components/settings/TheGoal';
import AddPushups from '@/components/main/AddPushups';
import TheStats from '@/components/stats/TheStats';
import TheHome from '@/components/home/TheHome';
import TheSettings from '@/components/settings/TheSettings.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            redirect: '/home'
        },
        { 
            path: '/home',
            component: TheHome
        },
        {
            path: '/add',
            component: AddPushups
        },
        {
            path: '/stats',
            component: TheStats
        },
        {
            path: '/goal',
            component: TheGoal
        },
        {
            path: '/settings',
            component: TheSettings
        }
    ]
})
export default router;
