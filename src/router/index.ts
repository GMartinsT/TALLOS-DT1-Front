import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocation } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
//import UsersView from '../views/UsersView.vue'
//import UserForm from '../components/UserForm.vue'
import LoginVue from '@/views/Login.vue'
import Dashboard from '@/components/Dashboard.vue'

const authGuard = () => (to: RouteLocation, from: RouteLocation, next:NavigationGuardNext) => {
  if (localStorage.getItem("token") || "") {
    next();
  } else {
    next("/login");
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/app'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue,
    },
    {
      path: '/app',
      name: 'dashboard',
      redirect: 'app/dashboard',
      component: Dashboard,
      beforeEnter: authGuard(),
      children: []
    },

    //{
    //  path: '/users',
    //  name: 'users',
    //  component: UsersView
    //},
    //{
    //  path: '/users/:id',
    //  name: 'form',
    //  component: UserForm
    //},
    //{
    //  path: '/users/novo',
    //  name: 'newUser',
    //  component: UserForm
    //}
  ]
})

export default router
