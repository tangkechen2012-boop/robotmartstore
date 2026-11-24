import { useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';

export function useCartSync() {
  const syncCart = useCartStore(state => state.syncCart);

  useEffect(() => {
    // Restore the saved cart from localStorage (skipped during server rendering), then sync with Shopify.
    void Promise.resolve(useCartStore.persist.rehydrate()).then(() => syncCart());
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncCart();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [syncCart]);
}
