'use client';
import { Car } from '@/types/car';
import { formatMileage } from '@/utils/formatMileage';
import RentForm from '@/components/RentForm/RentForm';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';
import css from './CarDetails.module.css';

export default function CarDetails({ car }: { car: Car }) {
  return (
    <div className={css.wrapper}>
      <div className={css.mainContent}>
        <div className={css.imageSection}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={600}
            height={400}
            className={css.mainImage}
          />
        </div>

        <div className={css.infoSection}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h1>

          <div className={css.location}>
            <Icon name="Location" width={18} height={18} />
            <span>{car.address}</span>
          </div>

          <div className={css.price}>${car.rentalPrice} per day</div>

          <div className={css.description}>
            <p>{car.description}</p>
          </div>

          <div className={css.specs}>
            <h3>Car Specifications:</h3>
            <div className={css.specsGrid}>
              <div className={css.specItem}>
                <Icon name="car" width={20} height={20} />
                <span>Type: {car.type}</span>
              </div>
              <div className={css.specItem}>
                <Icon name="fuel-pump" width={20} height={20} />
                <span>Fuel: {car.fuelConsumption} L/100km</span>
              </div>
              <div className={css.specItem}>
                <Icon name="gear" width={20} height={20} />
                <span>Engine: {car.engineSize}</span>
              </div>
              <div className={css.specItem}>
                <Icon name="check-circle" width={20} height={20} />
                <span>Mileage: {formatMileage(car.mileage)}</span>
              </div>
            </div>
          </div>

          <div className={css.features}>
            <h3>Accessories and functionalities:</h3>
            <div className={css.featuresGrid}>
              <div className={css.featuresColumn}>
                <h4>Accessories:</h4>
                <ul className={css.featureList}>
                  {car.accessories?.map((accessory, index) => (
                    <li key={index} className={css.featureItem}>
                      <Icon name="check-circle" width={16} height={16} />
                      {accessory}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={css.featuresColumn}>
                <h4>Functionalities:</h4>
                <ul className={css.featureList}>
                  {car.functionalities?.map((functionality, index) => (
                    <li key={index} className={css.featureItem}>
                      <Icon name="check-circle" width={16} height={16} />
                      {functionality}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className={css.sidebar}>
        <div className={css.rentalInfo}>
          <h3>Rental Conditions:</h3>
          <ul className={css.conditionsList}>
            {car.rentalConditions?.map((condition, index) => (
              <li key={index} className={css.conditionItem}>
                <Icon name="check-circle" width={16} height={16} />
                {condition}
              </li>
            ))}
          </ul>

          <div className={css.companyInfo}>
            <p>
              <strong>Company:</strong> {car.rentalCompany}
            </p>
            <p>
              <strong>Address:</strong> {car.address}
            </p>
          </div>
        </div>

        <RentForm carId={car.id} carTitle={`${car.brand} ${car.model}`} />
      </aside>
    </div>
  );
}
