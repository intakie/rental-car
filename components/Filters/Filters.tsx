'use client';
import { useState, useEffect } from 'react';
import { useCarStore } from '@/lib/store/carStore';
import styles from './Filters.module.css';

export default function Filters() {
  const { brands, filters, setFilters } = useCarStore();

  const [brand, setBrand] = useState(filters.brand || '');
  const [price, setPrice] = useState(filters.rentalPrice || '');
  const [minMileage, setMinMileage] = useState(filters.minMileage || '');
  const [maxMileage, setMaxMileage] = useState(filters.maxMileage || '');

  useEffect(() => {
    console.log('Filters mounted - fetching brands');
    useCarStore.getState().fetchBrands();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting filters:', {
      brand,
      price,
      minMileage,
      maxMileage,
    });

    const newFilters = {
      brand: brand || undefined,
      rentalPrice: price || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    };

    setFilters(newFilters);
  };

  const handleReset = async () => {
    console.log('Resetting filters');
    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
    setFilters({});
  };

  return (
    <div className={styles.filters}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label}>Car brand</label>
          <select
            className={styles.select}
            value={brand}
            onChange={e => setBrand(e.target.value)}
          >
            <option value="">Enter the text</option>
            {brands.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Price / 1 hour</label>
          <div className={styles.priceInput}>
            <span className={styles.currency}>$</span>
            <input
              className={styles.input}
              type="number"
              placeholder="To $"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className={styles.mileageGroup}>
          <label className={styles.mileageLabel}>Car mileage / km</label>
          <div className={styles.mileageInputs}>
            <div className={styles.mileageInput}>
              <span className={styles.mileagePlaceholder}>From</span>
              <input
                className={styles.input}
                type="number"
                placeholder=""
                value={minMileage}
                onChange={e => setMinMileage(e.target.value)}
                min="0"
              />
            </div>
            <div className={styles.mileageInput}>
              <span className={styles.mileagePlaceholder}>To</span>
              <input
                className={styles.input}
                type="number"
                placeholder=""
                value={maxMileage}
                onChange={e => setMaxMileage(e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
          <button
            className={styles.resetBtn}
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
