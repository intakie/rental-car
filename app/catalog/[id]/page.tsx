import { getCars } from '@/lib/carsApi';
import CarDetails from '@/components/CarDetails/CarDetails';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

type Props = {
  params: { id: string };
};

export default async function CarDetailsPage({ params }: Props) {
  const { id } = await params;

  const data = await getCars({}, 1, 20);
  const car = data.cars.find(c => c.id === id);

  if (!car) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CarDetails car={car} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const data = await getCars({}, 1, 20);
  const car = data.cars.find(c => c.id === id);

  if (!car) {
    return {
      title: 'Car not found - RentalCar',
    };
  }

  return {
    title: `${car.brand} ${car.model} ${car.year} - RentalCar`,
    description: car.description,
  };
}
