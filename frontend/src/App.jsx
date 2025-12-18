import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WriteNotice from './pages/WriteNotice';
import NoticeDetail from './pages/NoticeDetail';
import CalendarView from './pages/CalendarView';
import NoticeHistory from './pages/NoticeHistory';
import NoticeApproval from './pages/NoticeApproval';
import Layout from './components/Layout';
import './App.css';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/calendar" element={<CalendarView />} />
                    <Route path="/write" element={<WriteNotice />} />
                    <Route path="/history" element={<NoticeHistory />} />
                    <Route path="/approval" element={<NoticeApproval />} />
                    <Route path="/notice/:id" element={<NoticeDetail />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
