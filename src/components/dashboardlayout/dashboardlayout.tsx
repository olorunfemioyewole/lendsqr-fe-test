import type { ReactNode } from 'react';
import Navbar from '../navbar/navbar.tsx';
import Sidebar from '../sidebar/sidebar.tsx';
import styles from './dashboardlayout.module.scss';

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;