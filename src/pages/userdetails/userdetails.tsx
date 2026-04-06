import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboardlayout/dashboardlayout.tsx';
import type { User } from '../../types/user.ts';
import styles from './userdetails.module.scss';
import BackIcon from '../../assets/icons/chevron-left.svg';
import StarFilledIcon from '../../assets/icons/star-filled.svg';
import StarEmptyIcon from '../../assets/icons/star-empty.svg';

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('General Details');

  useEffect(() => {
    const stored = localStorage.getItem('selectedUser');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      navigate('/users');
    }
  }, [navigate]);

  if (!user) return null;

  const tabs = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

  const renderStars = (tier: number = 1) => (
    <div className={styles.stars}>
      {[1, 2, 3].map(i => (
        <img key={i} src={i <= tier ? StarFilledIcon : StarEmptyIcon} alt="" />
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className={styles.page}>

        {/* Back */}
        <button className={styles.back} onClick={() => navigate('/users')}>
          <img src={BackIcon} alt="" />
          Back to Users
        </button>

        {/* Page header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>User Details</h1>
          <div className={styles.actions}>
            <button className={styles.blacklistBtn}>BLACKLIST USER</button>
            <button className={styles.activateBtn}>ACTIVATE USER</button>
          </div>
        </div>

        {/* Profile card */}
        <div className={styles.profileCard}>
          <div className={styles.profileTop}>
            <div className={styles.avatar}>
              <span>{user.fullName?.[0] ?? 'U'}</span>
            </div>
            <div className={styles.profileInfo}>
              <h2>{user.fullName}</h2>
              <p>LSQFf587g90</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.tierInfo}>
              <p>User's Tier</p>
              {renderStars(user.tier)}
            </div>
            <div className={styles.divider} />
            <div className={styles.balanceInfo}>
              <h3>{user.accountBalance}</h3>
              <p>{user.accountNumber}/{user.bank}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'General Details' && (
          <div className={styles.detailsCard}>

            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>Personal Information</h4>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>FULL NAME</label>
                  <span>{user.fullName}</span>
                </div>
                <div className={styles.field}>
                  <label>PHONE NUMBER</label>
                  <span>{user.phoneNumber}</span>
                </div>
                <div className={styles.field}>
                  <label>EMAIL ADDRESS</label>
                  <span>{user.email}</span>
                </div>
                <div className={styles.field}>
                  <label>BVN</label>
                  <span>{user.bvn}</span>
                </div>
                <div className={styles.field}>
                  <label>GENDER</label>
                  <span>{user.gender}</span>
                </div>
                <div className={styles.field}>
                  <label>MARITAL STATUS</label>
                  <span>{user.maritalStatus}</span>
                </div>
                <div className={styles.field}>
                  <label>CHILDREN</label>
                  <span>{user.children}</span>
                </div>
                <div className={styles.field}>
                  <label>TYPE OF RESIDENCE</label>
                  <span>{user.typeOfResidence}</span>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>Education and Employment</h4>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>LEVEL OF EDUCATION</label>
                  <span>{user.levelOfEducation}</span>
                </div>
                <div className={styles.field}>
                  <label>EMPLOYMENT STATUS</label>
                  <span>{user.employmentStatus}</span>
                </div>
                <div className={styles.field}>
                  <label>SECTOR OF EMPLOYMENT</label>
                  <span>{user.sectorOfEmployment}</span>
                </div>
                <div className={styles.field}>
                  <label>DURATION OF EMPLOYMENT</label>
                  <span>{user.durationOfEmployment}</span>
                </div>
                <div className={styles.field}>
                  <label>OFFICE EMAIL</label>
                  <span>{user.officeEmail}</span>
                </div>
                <div className={styles.field}>
                  <label>MONTHLY INCOME</label>
                  <span>{user.monthlyIncome}</span>
                </div>
                <div className={styles.field}>
                  <label>LOAN REPAYMENT</label>
                  <span>{user.loanRepayment}</span>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>Socials</h4>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>TWITTER</label>
                  <span>{user.twitter}</span>
                </div>
                <div className={styles.field}>
                  <label>FACEBOOK</label>
                  <span>{user.facebook}</span>
                </div>
                <div className={styles.field}>
                  <label>INSTAGRAM</label>
                  <span>{user.instagram}</span>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>Guarantor</h4>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>FULL NAME</label>
                  <span>{user.guarantorName}</span>
                </div>
                <div className={styles.field}>
                  <label>PHONE NUMBER</label>
                  <span>{user.guarantorPhone}</span>
                </div>
                <div className={styles.field}>
                  <label>EMAIL ADDRESS</label>
                  <span>{user.guarantorEmail}</span>
                </div>
                <div className={styles.field}>
                  <label>RELATIONSHIP</label>
                  <span>{user.guarantorRelationship}</span>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'General Details' && (
          <div className={styles.detailsCard}>
            <p className={styles.emptyTab}>No data available for {activeTab}.</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default UserDetails;