import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';

// Icons
import briefcaseIcon from '../../assets/icons/briefcase.svg';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';
import dashboardIcon from '../../assets/icons/home.svg';
import usersIcon from '../../assets/icons/users.svg';
import userFriendsIcon from '../../assets/icons/user-friends.svg';
import loansIcon from '../../assets/icons/sack.svg';
import decisionsIcon from '../../assets/icons/handshake-regular.svg';
import savingsIcon from '../../assets/icons/piggy-bank.svg';
import loanRequestsIcon from '../../assets/icons/loan.svg';
import whitelistIcon from '../../assets/icons/user-check.svg';
import karmaIcon from '../../assets/icons/user-times.svg';
import orgIcon from '../../assets/icons/briefcase2.svg';
import bankIcon from '../../assets/icons/bank.svg';
import coinsIcon from '../../assets/icons/coins-solid.svg';
import transactionsIcon from '../../assets/icons/transfer.svg';
import servicesIcon from '../../assets/icons/galaxy.svg';
import serviceAccountIcon from '../../assets/icons/user-cog.svg';
import settlementsIcon from '../../assets/icons/scroll.svg';
import reportsIcon from '../../assets/icons/chart-bar.svg';
import preferencesIcon from '../../assets/icons/sliders.svg';
import feesPricingIcon from '../../assets/icons/badge-percent.svg';
import auditIcon from '../../assets/icons/clipboard-list.svg';
import logoutIcon from '../../assets/icons/sign-out.svg';
import tireIcon from '../../assets/icons/tire.svg';

const customerLinks = [
  { label: 'Users', icon: usersIcon, path: '/users' },
  { label: 'Guarantors', icon: userFriendsIcon, path: '/guarantors' },
  { label: 'Loans', icon: loansIcon, path: '/loans' },
  { label: 'Decision Models', icon: decisionsIcon, path: '/decisions' },
  { label: 'Savings', icon: savingsIcon, path: '/savings' },
  { label: 'Loan Requests', icon: loanRequestsIcon, path: '/loan-requests' },
  { label: 'Whitelist', icon: whitelistIcon, path: '/whitelist' },
  { label: 'Karma', icon: karmaIcon, path: '/karma' },
];

const businessLinks = [
  { label: 'Organization', icon: orgIcon, path: '/organization' },
  { label: 'Loan Products', icon: loanRequestsIcon, path: '/loan-products' },
  { label: 'Savings Products', icon: bankIcon, path: '/savings-products' },
  { label: 'Fees and Charges', icon: coinsIcon, path: '/fees' },
  { label: 'Transactions', icon: transactionsIcon, path: '/transactions' },
  { label: 'Services', icon: servicesIcon, path: '/services' },
  { label: 'Service Account', icon: serviceAccountIcon, path: '/service-account' },
  { label: 'Settlements', icon: settlementsIcon, path: '/settlements' },
  { label: 'Reports', icon: reportsIcon, path: '/reports' },
];

const settingsLinks = [
  { label: 'Preferences', icon: preferencesIcon, path: '/preferences' },
  { label: 'Fees and Pricing', icon: feesPricingIcon, path: '/fees-pricing' },
  { label: 'Audit Logs', icon: auditIcon, path: '/audit' },
  { label: 'Systems messages', icon: tireIcon, path: '/systems-messages' },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.orgSwitcher}>
        <img src={briefcaseIcon} alt="" />
        <span>Switch Organization</span>
        <img src={chevronDownIcon} alt="" />
      </div>

      <NavLink to="/dashboard" className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <img src={dashboardIcon} alt="" />
        <span>Dashboard</span>
      </NavLink>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>CUSTOMERS</p>
        {customerLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <img src={link.icon} alt="" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>BUSINESSES</p>
        {businessLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <img src={link.icon} alt="" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>SETTINGS</p>
        {settingsLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <img src={link.icon} alt="" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <button className={styles.logout}>
        <img src={logoutIcon} alt="" />
        <span>Log out</span>
      </button>

      <p className={styles.version}>v1.2.0</p>
    </aside>
  );
};

export default Sidebar;