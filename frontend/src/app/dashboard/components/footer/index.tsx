
import { Annie_Use_Your_Telescope } from 'next/font/google';
import styles from './styles.module.scss';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <p>
          &copy; Pizzaria Brasa | 2024
        </p>
        <nav>
          <a className={styles.img}
            href="#" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} color="crimson" />
          </a >
          <a className={styles.img}
            href="#" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} color="crimson" />
          </a>
          <a className={styles.img}
            href="#" target="_blank" rel="noopener noreferrer">
            <Twitter size={24} color="crimson" />
          </a>
          <a className={styles.img}
            href="#" target="_blank" rel="noopener noreferrer">
            <Youtube size={24} color="crimson" />
          </a>
        </nav>
      </div>

    </footer>
  )
}