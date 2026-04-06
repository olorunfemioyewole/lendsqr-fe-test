import styles from './navbar.module.scss';

import searchIcon from '../../assets/icons/search.svg';
import bellIcon from '../../assets/icons/bell.svg';
import dropDownIcon from '../../assets/icons/dropdown.svg';
import avatarImg from '/avatar.png';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <div className={styles.logoWrapper}>
          <img src="/lendsqr-logo.svg" alt="Lendsqr" className={styles.logo} />
        </div>
        
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search for anything"
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <img src={searchIcon} alt="search" />
          </button>
        </div>
      </div>
      

      <div className={styles.navRight}>
        <a href="#" className={styles.docsLink}>Docs</a>
        <button className={styles.iconBtn}>
          <img src={bellIcon} alt="notifications" />
        </button>
        <div className={styles.profile}>
          <img src={avatarImg} alt="user" className={styles.avatar} />
          <span className={styles.username}>Adedeji</span>
          <img src={dropDownIcon} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;