import Link from 'next/link';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className="wrapper">
        <div className={css.inner}>
          <div>
            <h1 className={css.title}>Find your perfect rental car</h1>
            <p className={css.subtitle}>
              Reliable and budget-friendly rentals for any journey
            </p>
            <Link href="/catalog">
              <button className={css.heroBtn}>View Catalog</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
