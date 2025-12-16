import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WriteNotice from './pages/WriteNotice';
import NoticeDetail from './pages/NoticeDetail';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <div className="nav-brand">IT Notice System</div>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Dashboard</Link>
                        <Link to="/write" className="nav-link btn-upload">New Notice</Link>
                    </div>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/write" element={<WriteNotice />} />
                        <Route path="/notice/:id" element={<NoticeDetail />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
