import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocation } from 'vue-router'
import LoginViewVue from '@/views/LoginView.vue';
import CreateUserViewVue from '@/views/CreateUserView.vue';
import UpdateUserViewVue from '@/views/UpdateUserView.vue';
import UsersViewVue from '@/views/UsersView.vue';

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
      component: LoginViewVue,
    },
    {
      path: '/register',
      name: 'register',
      component: CreateUserViewVue
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateUserViewVue
    },
    {
      path: '/users',
      name: 'users',
      component: UsersViewVue
    },
  ]
})

export default router