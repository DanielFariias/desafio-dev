import React from 'react';

import { Header } from '../header';
import { Footer } from '../footer';

import styles from './styles.module.scss';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}
