'use client';

import Link from 'next/link';
import { Car } from '@/types/car';
import { formatMileage } from '@/utils/formatMileage';
import { useCarStore } from '@/lib/store/carStore';
import Image from 'next/image';
import Icon from '@/components/Icon/Icon';
import css from './CarCard.module.css';

export default function CarCard({ car }: { car: Car }) {
  const { toggleFavorite, favorites } = useCarStore();
  const fav = favorites.includes(car.id);

  const addressParts = car.address.split(',');
  const city = addressParts[1]?.trim();
  const country = addressParts[2]?.trim();

  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={274}
          height={268}
          className={css.img}
        />
        <button
          className={`${css.favorite} ${fav ? css.favoriteActive : ''}`}
          onClick={() => toggleFavorite(car.id)}
        >
          <Icon name={fav ? 'filled-heart' : 'heart'} width={24} height={24} />
        </button>
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{' '}
            {car.year}
          </h3>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>

        <div className={css.info}>
          <span className={css.detailItem}>{city}</span>
          <span className={css.detailItem}>{country}</span>
          <span className={css.detailItem}>{car.rentalCompany}</span>
        </div>

        <div className={css.details}>
          <span className={css.detailItem}>{car.type}</span>
          <span className={css.detailItem}>{car.engineSize}</span>
          <span className={css.detailItem}>{car.fuelConsumption} L/100km</span>
          <span className={css.detailItem}>{formatMileage(car.mileage)}</span>
        </div>

        <div className={css.actions}>
          <Link href={`/catalog/${car.id}`} className={css.button}>
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
}
