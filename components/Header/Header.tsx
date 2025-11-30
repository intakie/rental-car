'use client';

import css from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link href="/" className={css.logo}>
          RentalCar
        </Link>

        <nav className={css.nav}>
          <Link
            href="/"
            className={`${css.link} ${pathname === '/' ? css.active : ''}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${css.link} ${pathname === '/catalog' ? css.active : ''}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
