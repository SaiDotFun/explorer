import { saiExploreUrl } from '@/libs/saiExplore';
import { useBlockchain } from '@/stores';
import { createRouter, createWebHistory } from 'vue-router';
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts';
// @ts-ignore
import routes from '~pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
});

router.beforeEach((to, from) => {
  // Firebase handles direct requests. Send in-app links to the same destination.
  if (from.matched.length) {
    const destination = saiExploreUrl(to.path);
    if (destination) {
      const suffix = to.fullPath.slice(to.path.length);
      window.location.assign(destination + suffix);
      return false;
    }
  }

  const { chain } = to.params;
  if (chain) {
    const blockchain = useBlockchain();
    if (chain !== blockchain.chainName) {
      blockchain.setCurrent(chain.toString());
    }
  }
});

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router;
