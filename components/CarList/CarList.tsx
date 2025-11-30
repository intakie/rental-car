import CarCard from '@/components/CarCard/CarCard';
import { Car } from '@/types/car';
import styles from './CarList.module.css';

type Props = { cars: Car[] };

export default function CarList({ cars }: Props) {
  if (!cars.length) {
    return (
      <div className={styles.empty}>
        <p>No cars found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
