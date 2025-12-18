import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, PenSquare, Bell, User, Search, Menu, CheckCircle } from 'lucide-react';

export default function Layout({ children }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">S</div>
                    <span className="logo-text">공지관리 시스템</span>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section-label">MENU</div>
                    <Link to="/" className={`sidebar-link ${isActive('/') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/write" className={`sidebar-link ${isActive('/write') ? 'active' : ''}`}>
                        <PenSquare size={20} />
                        <span>공지 등록</span>
                    </Link>
                    <Link to="/history" className={`sidebar-link ${isActive('/history') ? 'active' : ''}`}>
                        <Menu size={20} />
                        <span>공지 발송 History</span>
                    </Link>
                    <Link to="/approval" className={`sidebar-link ${isActive('/approval') ? 'active' : ''}`}>
                        <CheckCircle size={20} />
                        <span>공지 발송 결재</span>
                    </Link>
                    {/* Calendar kept as utility, but strictly following user list order above */}
                    <Link to="/calendar" className={`sidebar-link ${isActive('/calendar') ? 'active' : ''}`}>
                        <Calendar size={20} />
                        <span>일정 관리</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-mini-profile">
                        <div className="avatar">AD</div>
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">System Admin</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="main-wrapper">
                <header className="top-header">
                    <div className="header-search">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search notices..." className="search-input" />
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn">
                            <Bell size={20} />
                            <span className="badge-dot"></span>
                        </button>
                        <button className="icon-btn">
                            <User size={20} />
                        </button>
                    </div>
                </header>

                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
