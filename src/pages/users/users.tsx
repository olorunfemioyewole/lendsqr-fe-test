import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboardlayout/dashboardlayout.tsx';
import styles from './users.module.scss';
import type { User } from '../../types/user.ts';

import UserIcon from '../../assets/icons/np_users_1.svg';
import ActiveUserIcon from '../../assets/icons/np_users_2.svg';
import coinIcon from '../../assets/icons/coins_outline.svg';
import LoanIcon from '../../assets/icons/np_loan.svg';
import DropDownIcon from '../../assets/icons/chevron-down.svg';
import NextIcon from '../../assets/icons/chevron-right.svg';
import PreviousIcon from '../../assets/icons/chevron-left.svg';
import MenuIcon from '../../assets/icons/more.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import ViewIcon from '../../assets/icons/np_eye.svg';
import BlacklistIcon from '../../assets/icons/np_delete_user.svg';
import ActivateIcon from '../../assets/icons/user-check.svg';
import CalendarIcon from '../../assets/icons/np_calendar.svg';

const generateUsers = (): User[] => {
  const orgs = ['Lendsqr', 'Irorun', 'Lendstar', 'Moniepoint', 'Kuda'];
  const statuses: User['status'][] = ['active', 'inactive', 'pending', 'blacklisted'];
  const names = ['Grace Effiom', 'Tosin Dokunmu', 'Debby Ogana', 'Adedeji Yusuf',
    'Chidi Okeke', 'Amaka Nwosu', 'Emeka Eze', 'Fatima Bello', 'Tunde Adeyemi', 'Ngozi Obi'];

  return Array.from({ length: 500 }, (_, i) => ({
    id: String(i + 1).padStart(3, '0'),
    username: names[i % names.length],
    fullName: names[i % names.length],
    organization: orgs[i % orgs.length],
    email: `user${i + 1}@${orgs[i % orgs.length].toLowerCase()}.com`,
    phoneNumber: `080${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
    createdAt: `Apr ${(i % 28) + 1}, 2020 10:00AM`,
    status: statuses[i % statuses.length],
    tier: (i % 3) + 1,
    accountBalance: `₦${(Math.random() * 500000).toFixed(2)}`,
    accountNumber: `99123456${String(i).padStart(2, '0')}`,
    bank: 'Providus Bank',
    bvn: `0706078092${i % 10}`,
    gender: i % 2 === 0 ? 'Female' : 'Male',
    maritalStatus: i % 2 === 0 ? 'Single' : 'Married',
    children: i % 3 === 0 ? 'None' : String(i % 3),
    typeOfResidence: "Parent's Apartment",
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'FinTech',
    durationOfEmployment: '2 years',
    officeEmail: `grace@lendsqr.com`,
    monthlyIncome: '₦200,000.00- ₦400,000.00',
    loanRepayment: '40,000',
    twitter: '@grace_effiom',
    facebook: 'Grace Effiom',
    instagram: '@grace_effiom',
    guarantorName: 'Debby Ogana',
    guarantorPhone: '07060780922',
    guarantorEmail: 'debby@gmail.com',
    guarantorRelationship: 'Sister',
  }));
};

const ALL_USERS = generateUsers();
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const EMPTY_FILTER: FilterState = {
  organization: '', username: '', email: '',
  date: '', phoneNumber: '', status: '',
};

const Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTER);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(EMPTY_FILTER);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close filter/menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredUsers = ALL_USERS.filter((u) => {
    const f = appliedFilters;
    return (
      (!f.organization || u.organization.toLowerCase().includes(f.organization.toLowerCase())) &&
      (!f.username || u.username.toLowerCase().includes(f.username.toLowerCase())) &&
      (!f.email || u.email.toLowerCase().includes(f.email.toLowerCase())) &&
      (!f.phoneNumber || u.phoneNumber.includes(f.phoneNumber)) &&
      (!f.status || u.status === f.status) &&
      (!f.date || u.createdAt.includes(f.date))
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleApplyFilter = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const handleResetFilter = () => {
    setFilters(EMPTY_FILTER);
    setAppliedFilters(EMPTY_FILTER);
    setCurrentPage(1);
  };

  const handleViewDetails = (user: User) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    navigate(`/users/${user.id}`);
    setOpenMenuId(null);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Users</h1>

        {/* Metrics */}
        <div className={styles.metrics}>
          {[
            { icon: UserIcon, cls: styles.usersIcon, label: 'USERS', value: '2,453' },
            { icon: ActiveUserIcon, cls: styles.activeUsersIcon, label: 'ACTIVE USERS', value: '2,453' },
            { icon: LoanIcon, cls: styles.loanUsersIcon, label: 'USERS WITH LOANS', value: '12,453' },
            { icon: coinIcon, cls: styles.savingsUsersIcon, label: 'USERS WITH SAVINGS', value: '102,453' },
          ].map(({ icon, cls, label, value }) => (
            <div key={label} className={styles.metric}>
              <div className={cls}><img src={icon} alt="" /></div>
              <span>{label}</span>
              <span className={styles.value}>{value}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className={styles.data}>
          <div className={styles.tableWrapper}>
            <div className={styles.table}>

              {/* Header */}
              <div className={styles.heading}>
                {(['ORGANIZATION', 'USERNAME', 'EMAIL', 'PHONE NUMBER', 'DATE JOINED', 'STATUS'] as const).map((col) => (
                  <span key={col} className={styles[col.toLowerCase().replace(' ', '') as keyof typeof styles]}>
                    {col}
                    <button
                      className={styles.filterBtn}
                      onClick={() => setFilterOpen(prev => !prev)}
                    >
                      <img src={FilterIcon} alt="Filter" />
                    </button>
                  </span>
                ))}
                <span className={styles.menu} />
              </div>

              {/* Filter dropdown */}
              {filterOpen && (
                <div className={styles.filterDropdown} ref={filterRef}>
                  <div className={styles.filterField}>
                    <label>Organization</label>
                    <select value={filters.organization}
                      onChange={e => setFilters(f => ({ ...f, organization: e.target.value }))}>
                      <option value="">Select</option>
                      {['Lendsqr', 'Irorun', 'Lendstar', 'Moniepoint', 'Kuda'].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.filterField}>
                    <label>Username</label>
                    <input placeholder="User" value={filters.username}
                      onChange={e => setFilters(f => ({ ...f, username: e.target.value }))} />
                  </div>
                  <div className={styles.filterField}>
                    <label>Email</label>
                    <input placeholder="Email" value={filters.email}
                      onChange={e => setFilters(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className={styles.filterField}>
                    <label>Date</label>
                    <div className={styles.dateInputWrapper}>
                      <input
                        type="date"
                        value={filters.date}
                        onChange={e => setFilters(f => ({ ...f, date: e.target.value }))}
                      />
                      <img src={CalendarIcon} alt="" className={styles.calendarIcon} />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>Phone Number</label>
                    <input placeholder="Phone Number" value={filters.phoneNumber}
                      onChange={e => setFilters(f => ({ ...f, phoneNumber: e.target.value }))} />
                  </div>
                  <div className={styles.filterField}>
                    <label>Status</label>
                    <select value={filters.status}
                      onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
                      <option value="">Select</option>
                      {['active', 'inactive', 'pending', 'blacklisted'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.filterActions}>
                    <button className={styles.resetBtn} onClick={handleResetFilter}>Reset</button>
                    <button className={styles.applyBtn} onClick={handleApplyFilter}>Filter</button>
                  </div>
                </div>
              )}

              {/* Rows */}
              {paginatedUsers.map((user) => (
                <div key={user.id} className={styles.body}>
                  <span className={styles.org}>{user.organization}</span>
                  <span className={styles.usn}>{user.username}</span>
                  <span className={styles.eml}>{user.email}</span>
                  <span className={styles.phn}>{user.phoneNumber}</span>
                  <span className={styles.cat}>{user.createdAt}</span>
                  <span className={styles.stat}>
                    <span className={`${styles.badge} ${styles[user.status]}`}>
                      {user.status}
                    </span>
                  </span>
                  <div className={styles.menuWrapper} ref={openMenuId === user.id ? menuRef : null}>
                    <button
                      className={styles.menuBtn}
                      onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                    >
                      <img src={MenuIcon} alt="More options" />
                    </button>
                    {openMenuId === user.id && (
                      <div className={styles.menuDropdown}>
                        <button onClick={() => handleViewDetails(user)}>
                          <img src={ViewIcon} alt="" /> View Details
                        </button>
                        <button onClick={() => setOpenMenuId(null)}>
                          <img src={BlacklistIcon} alt="" /> Blacklist User
                        </button>
                        <button onClick={() => setOpenMenuId(null)}>
                          <img src={ActivateIcon} alt="" /> Activate User
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className={styles.paginate}>
            <div className={styles.left}>
              <span>Showing</span>
              <div className={styles.pageSizeSelect}>
                <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                  {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <img src={DropDownIcon} alt="" />
              </div>
              <span>out of {filteredUsers.length}</span>
            </div>
            <div className={styles.right}>
              <button
                className={styles.pageNav}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <img src={PreviousIcon} alt="Previous" />
              </button>
              {getPageNumbers().map((page, i) => (
                <button
                  key={i}
                  className={`${styles.pageNum} ${page === currentPage ? styles.activePage : ''} ${page === '...' ? styles.ellipsis : ''}`}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
              <button
                className={styles.pageNav}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <img src={NextIcon} alt="Next" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;