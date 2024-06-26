import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Loginview.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue';
import CheckoutSuccessView from '../views/CheckoutSuccessView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
    { 
        path: '/', 
        component: HomeView,
        meta: {
            title: "SBL SHOP®",
        }
    },
    { 
      path: '/login', 
      component: LoginView,
      meta: {
          title: "Prijavi se",
      }
    },
    { 
      path: '/register', 
      component: RegisterView,
      meta: {
          title: "Izradi račun",
      }
    },
    {
      path: '/item/:id',
      component: ProductView,
      name: 'ItemDetail',
      props: true,
      meta : {
        title: "Proizvod",
      }
    },
    {
      path: '/cart',  // The URL path for the cart view
      component: CartView,
      name: 'Cart',
      meta: {
        title: "Košarica",
      }
    },
    {
      path: '/checkout',  // Define the path for the checkout view
      component: CheckoutView,
      name: 'Checkout',
      meta: {
        title: "Naplata",
      }
    },
    {
      path: '/profile',
      component: ProfileView,
      name: 'Profile',
      meta: {
        title: "Profile",
      }
    },
    {
      path: '/checkout/success',
      component: CheckoutSuccessView,
      name: 'CheckoutSuccess',
      meta: {
        title: "Narudžba zaprimljena",
      }
    },
    ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0, behavior: 'smooth' };
      }
    }
  });
  
  router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
      document.title = to.meta.title;
    } else {
      document.title = 'SBL';
    }
    next();
  });
  
  export default router;