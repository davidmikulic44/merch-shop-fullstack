import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Loginview.vue'

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