import DashboardLayout from '../../components/dashboardlayout/dashboardlayout.tsx';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Dashboard</h1>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;