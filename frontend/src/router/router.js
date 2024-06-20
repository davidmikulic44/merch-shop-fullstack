import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Loginview.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue';
import ProfileView from '../views/ProfileView.vue'
const routes = [
    { 
        path: '/', 
        component: HomeView,
        meta: {
            title: "Home",
        }
    },
    { 
      path: '/login', 
      component: LoginView,
      meta: {
          title: "Login",
      }
    },
    { 
      path: '/register', 
      component: RegisterView,
      meta: {
          title: "Register",
      }
    },
    {
      path: '/item/:id',
      component: ProductView,
      name: 'ItemDetail',
      props: true,
      meta : {
        title: "Product",
      }
    },
    {
      path: '/cart',  // The URL path for the cart view
      component: CartView,
      name: 'Cart',
      meta: {
        title: "Cart",
      }
    },
    {
      path: '/checkout',  // Define the path for the checkout view
      component: CheckoutView,
      name: 'Checkout',
      meta: {
        title: "Checkout",
      }
    },
    {
      path: '/profile',
      component: ProfileView,
      name: 'Profile',
      meta: {
        title: "Profile",
      }
    }
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
  
  router.beforeEach((to, from)=> {
    document.title=to.meta?.title ?? 'SBL';
  })
  
  export default router;