import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotices } from '../api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, CheckCircle, AlertCircle, Clock, Calendar as CalendarIcon, List, BarChart2, Hash } from 'lucide-react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock Department Data
const DEPT_DATA = [
    { name: 'HR', value: 12 },
    { name: 'IT', value: 25 },
    { name: 'Sales', value: 18 },
    { name: 'Markt', value: 8 },
    { name: 'Legal', value: 5 },
];

export default function Dashboard() {
    const [notices, setNotices] = useState([]);
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

    useEffect(() => {
        loadNotices();
    }, []);

    const loadNotices = async () => {
        try {
            const data = await getNotices();
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotices(data);
            calculateStats(data);

            // Map notices to calendar events
            const mappedEvents = data
                .filter(n => n.schedule)
                .map(n => ({
                    id: n.id,
                    title: n.title,
                    start: new Date(n.schedule.startDateTime),
                    end: new Date(n.schedule.endDateTime),
                    status: n.status
                }));
            setEvents(mappedEvents);
        } catch (error) {
            console.error("Failed to fetch notices", error);
        }
    };

    const calculateStats = (data) => {
        const counts = data.reduce((acc, curr) => {
            acc.total++;
            if (curr.status === 'PENDING') acc.pending++;
            else if (curr.status === 'APPROVED') acc.approved++;
            else if (curr.status === 'REJECTED') acc.rejected++;
            return acc;
        }, { total: 0, pending: 0, approved: 0, rejected: 0 });
        setStats(counts);
    };

    const getPieData = () => {
        const typeCounts = notices.reduce((acc, curr) => {
            acc[curr.noticeType] = (acc[curr.noticeType] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(typeCounts).map(type => ({ name: type, value: typeCounts[type] }));
    };

    const getMaintenanceNotices = () => {
        return notices.filter(n => n.noticeType === 'SYSTEM_MAINTENANCE').slice(0, 5);
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = '#3174ad';
        if (event.status === 'APPROVED') backgroundColor = '#10b981';
        if (event.status === 'PENDING') backgroundColor = '#f59e0b';
        if (event.status === 'REJECTED') backgroundColor = '#ef4444';
        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <div>
            {/* 1. Top: Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card">
                    <div className="summary-icon" style={{ background: '#E0E7FF', color: '#4F46E5' }}>
                        <FileText />
                    </div>
                    <div className="summary-info">
                        <h3>{stats.total}</h3>
                        <p>전체 공지</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                        <Clock />
                    </div>
                    <div className="summary-info">
                        <h3>{stats.pending}</h3>
                        <p>승인 대기</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon" style={{ background: '#D1FAE5', color: '#059669' }}>
                        <CheckCircle />
                    </div>
                    <div className="summary-info">
                        <h3>{stats.approved}</h3>
                        <p>승인 완료</p>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                        <AlertCircle />
                    </div>
                    <div className="summary-info">
                        <h3>{stats.rejected}</h3>
                        <p>반려됨</p>
                    </div>
                </div>
            </div>

            {/* 2. Middle: Flattened Calendar View */}
            <div className="section-card dashboard-calendar-section">
                <div className="section-header">
                    <CalendarIcon size={20} style={{ marginRight: '8px', color: '#4F46E5' }} />
                    <h3 className="section-title" style={{ margin: 0 }}>월간 공지 일정</h3>
                </div>
                <div style={{ height: '350px' }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month']}
                        defaultView="month"
                        eventPropGetter={eventStyleGetter}
                        toolbar={true}
                    />
                </div>
            </div>

            {/* 3. Bottom: Grid Layout */}
            <div className="dashboard-bottom-grid">

                {/* 3-1. System Maintenance */}
                <div className="section-card">
                    <div className="section-header">
                        <AlertCircle size={20} style={{ marginRight: '8px', color: '#DC2626' }} />
                        <h3 className="section-title" style={{ margin: 0 }}>시스템 점검 일정</h3>
                    </div>
                    <ul className="simple-list">
                        {getMaintenanceNotices().map(notice => (
                            <li key={notice.id} className="simple-list-item">
                                <span className="date-badge">{new Date(notice.createdAt).toLocaleDateString().slice(5)}</span>
                                <Link to={`/notice/${notice.id}`} className="link-text">{notice.title}</Link>
                            </li>
                        ))}
                        {getMaintenanceNotices().length === 0 && <li className="empty-msg">예정된 점검이 없습니다.</li>}
                    </ul>
                </div>

                {/* 3-2. Recent Notices */}
                <div className="section-card">
                    <div className="section-header">
                        <List size={20} style={{ marginRight: '8px', color: '#4F46E5' }} />
                        <h3 className="section-title" style={{ margin: 0 }}>최근 공지 목록</h3>
                    </div>
                    <ul className="simple-list">
                        {notices.slice(0, 5).map(notice => (
                            <li key={notice.id} className="simple-list-item">
                                <span className={`status-dot ${notice.status.toLowerCase()}`}></span>
                                <Link to={`/notice/${notice.id}`} className="link-text">{notice.title}</Link>
                                <span className="meta-text">{notice.writerId}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3-3. Notice Type Stats */}
                <div className="section-card">
                    <div className="section-header">
                        <Hash size={20} style={{ marginRight: '8px', color: '#10B981' }} />
                        <h3 className="section-title" style={{ margin: 0 }}>공지 유형 통계</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={getPieData()}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {getPieData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 3-4. Department Stats (Mock) */}
                <div className="section-card">
                    <div className="section-header">
                        <BarChart2 size={20} style={{ marginRight: '8px', color: '#F59E0B' }} />
                        <h3 className="section-title" style={{ margin: 0 }}>부서별 수신 현황</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={DEPT_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}
