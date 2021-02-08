import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import setup from '../views/setup.vue';
import scan from '../views/scan.vue';
import keypad from '../views/keypad.vue';
import express from '../views/express.vue';
import pageNotFound from '../views/pageNotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
        meta: {
            title: 'Home',
            visible: true
        },
    },
    {
        path: '/setup',
        name: 'Station Setup',
        component: setup,
        meta: {
            title: 'Station Setup',
            visible: true
        },
    },
    {
        path: '/scan',
        name: 'Badge Scan',
        component: scan,
        meta: {
            title: 'Badge Scan',
            visible: true
        },
    },
    {
        path: '/keypad',
        name: 'Keypad Entry',
        component: keypad,
        meta: {
            title: 'Keypad Entry',
            visible: true
        },
    },
    {
      path: '/express',
      name: 'Express Lane',
      component: express,
      meta: {
          title: 'Express Lane',
          visible: true
      },
  },
    {
      path: '*',
      name: '404 Not Found',
      component: pageNotFound,
      meta: {
          title: '404 Not Found',
          visible: false
      },
    }, 
];

const router = new VueRouter({
    mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.title);
  
    const nearestWithMeta = to.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.metaTags);
  
    if (nearestWithTitle) document.title = `${nearestWithTitle.meta.title} | JCHS Badge System Client`;
  
    Array.from(
      document.querySelectorAll('[data-vue-router-controlled]'),
    ).map((el) => el.parentNode.removeChild(el));
  
    if (!nearestWithMeta) return next();
  
    nearestWithMeta.meta.metaTags
      .map((tagDef) => {
        const tag = document.createElement('meta');
  
        Object.keys(tagDef).forEach((key) => {
          tag.setAttribute(key, tagDef[key]);
        });
  
        tag.setAttribute('data-vue-router-controlled', '');
  
        return tag;
      })
      .forEach((tag) => document.head.appendChild(tag));
  
    next();
  });
  
export default router;