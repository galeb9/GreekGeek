import { createRouter, createWebHistory } from 'vue-router';

import TheHome from '@/views/TheHome';
import TheGoal from '@/views/TheGoal';
import TheSettings from '@/views/TheSettings.vue'
import AddPushups from '@/views/AddPushups';
import TheStats from '@/views/TheStats';
import LoginForm from '@/views/auth/LoginForm'
import RegisterForm from '@/views/auth/RegisterForm'
import ResetPassword from '@/views/auth/ResetPassword'
import TheFriends from '@/views/TheFriends.vue'
import MyProfile from '@/views/MyProfile.vue'
import MyArenas from '@/views/MyArenas.vue'
import NotFound from '@/views/NotFound.vue'

import { auth } from '@/scripts/firebaseInit.js'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            redirect: '/home'
        },
        { 
            path: '/home',
            name: 'Home',
            component: TheHome,
            meta: {
                requiresAuth: true
            }
        },
        { 
            path: '/login',
            component: LoginForm,
            meta: {
                requiresGuest: true
            }
        },
        { 
            path: '/register',
            component: RegisterForm,
            meta: {
                requiresGuest: true
            }
        },
        { 
            path: '/reset-password',
            component: ResetPassword,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/add',
            component: AddPushups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/stats',
            component: TheStats,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/goal',
            component: TheGoal,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/settings',
            component: TheSettings,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/friends',
            component: TheFriends,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            component: MyProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/arena',
            component: MyArenas,
            meta: {
                requiresAuth: true
            }
        },
        // {
        //     path: '/arena/:id',
        //     name: 'SelectedGroup',
        //     component: SelectedGroup,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

// nav guards -> this is why we must be logged in to use
router.beforeEach((to, from, next) => {
    //Check for requiredAuth guard
    if(to.matched.some(record => record.meta.requiresAuth)) {
        // Check if NOT logged in
        if(!auth.currentUser){
            // Go to Login page
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            // Procced to route
            next();
        }
    } else if(to.matched.some(record => record.meta.requiresGuest)){
        //Check for requiredAuth guard
        if(to.matched.some(record => record.meta.requiresAuth)) {
            // Check if logged in
            if(auth.currentUser){
                // Go to home page
                next({
                    path: '/',
                    query: {
                        redirect: to.fullPath
                    }
                });
            } else {
                // Procced to route
                next();
            }
        } else {
            // Procced to route
            next();
        }
    }
})


export default router;
