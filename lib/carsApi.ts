import { api } from './api';
import { Car, PaginatedCarsResponse } from '@/types/car';
import { Filters } from '@/types/filters';

export const getCars = async (filters: Filters = {}, page = 1, limit = 100) => {
  const params: Record<string, string | number> = {
    page,
    limit,
  };

  if (filters.brand) params.brand = filters.brand;
  if (filters.rentalPrice) params.rentalPrice = filters.rentalPrice;
  if (filters.minMileage) params.minMileage = filters.minMileage;
  if (filters.maxMileage) params.maxMileage = filters.maxMileage;

  const res = await api.get<PaginatedCarsResponse>('/cars', { params });
  return res.data;
};

export const getCarById = async (id: string) => {
  try {
    const res = await api.get<Car>(`/cars/${id}`);
    return res.data;
  } catch {
    console.warn('Car by ID endpoint failed, using fallback');

    const data = await getCars({}, 1, 50);
    const car = data.cars.find(c => c.id === id);

    if (car) return car;
    throw new Error('Car not found');
  }
};

export const getBrands = async () => {
  const res = await api.get<string[]>('/brands');
  return res.data;
};
