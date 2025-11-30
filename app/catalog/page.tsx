'use client';
import { useEffect } from 'react';
import { useCarStore } from '@/lib/store/carStore';
import Filters from '@/components/Filters/Filters';
import CarList from '@/components/CarList/CarList';
import LoadMore from '@/components/LoadMore/LoadMore';
import styles from './page.module.css';

export default function CatalogPage() {
  const { cars, loading, error, fetchCars, fetchBrands, page, totalPages } =
    useCarStore();

  useEffect(() => {
    console.log('CatalogPage mounted - initializing...');
    fetchBrands();
    fetchCars({ reset: true, limit: 12 });
  }, [fetchBrands, fetchCars]);

  useEffect(() => {
    console.log('CatalogPage state updated -', {
      cars: cars.length,
      page,
      totalPages,
      loading,
      error,
    });
  }, [cars, page, totalPages, loading, error]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.filtersSection}>
          <Filters />
        </div>

        <main className={styles.main}>
          {loading && cars.length === 0 && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <CarList cars={cars} />

          {!loading && cars.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>No cars found. Try changing your filters.</p>
            </div>
          )}

          <LoadMore />
        </main>
      </div>
    </div>
  );
}
