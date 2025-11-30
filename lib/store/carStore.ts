import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';
import { Filters } from '@/types/filters';
import * as carsApi from '@/lib/carsApi';

type State = {
  cars: Car[];
  page: number;
  totalPages: number;
  totalCars: number;
  filters: Filters;
  favorites: string[];
  brands: string[];
  loading: boolean;
  error?: string | null;
};

type Actions = {
  setFilters: (f: Filters) => void;
  resetResults: () => void;
  fetchCars: (opts?: { reset?: boolean; limit?: number }) => Promise<void>;
  loadMore: () => Promise<void>;
  fetchCarById: (id: string) => Promise<Car | null>;
  fetchBrands: () => Promise<void>;
  toggleFavorite: (id: string) => void;
};

export const useCarStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cars: [],
      page: 1,
      totalPages: 1,
      totalCars: 0,
      filters: {},
      favorites: [],
      brands: [],
      loading: false,
      error: null,

      setFilters: (filters: Filters) => {
        set({ filters, page: 1 });

        get().fetchCars({ reset: true, limit: 12 });
      },

      resetResults: () =>
        set({ cars: [], page: 1, totalPages: 1, totalCars: 0 }),

      fetchCars: async ({ reset = false, limit = 12 } = {}) => {
        try {
          set({ loading: true, error: null });

          const currentState = get();
          const currentPage = reset ? 1 : currentState.page;
          const filters = currentState.filters;

          console.log(
            'Fetching cars with filters:',
            filters,
            'page:',
            currentPage
          );

          const data = await carsApi.getCars(filters, currentPage, limit);

          set({
            cars: reset ? data.cars : [...currentState.cars, ...data.cars],
            page: data.page,
            totalPages: data.totalPages,
            totalCars: data.totalCars,
            loading: false,
          });

          console.log(
            'Fetched cars:',
            data.cars.length,
            'totalPages:',
            data.totalPages
          );
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Fetch error';
          set({ error: message, loading: false });
          console.error('Error fetching cars:', message);
        }
      },

      loadMore: async () => {
        const state = get();
        console.log(
          'Load more - current page:',
          state.page,
          'totalPages:',
          state.totalPages
        );

        if (state.page >= state.totalPages || state.loading) {
          console.log('Cannot load more - reached end or loading');
          return;
        }

        set({ page: state.page + 1 });
        await get().fetchCars({ reset: false });
      },

      fetchCarById: async (id: string) => {
        try {
          set({ loading: true });
          const car = await carsApi.getCarById(id);
          set({ loading: false });
          return car;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Fetch error';
          set({ error: message, loading: false });
          return null;
        }
      },

      fetchBrands: async () => {
        try {
          const brands = await carsApi.getBrands();
          set({ brands });
        } catch {
          set({ brands: [] });
        }
      },

      toggleFavorite: (id: string) =>
        set(state => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter(f => f !== id)
              : [...state.favorites, id],
          };
        }),
    }),
    {
      name: 'rentalcar-storage',
      partialize: state => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
