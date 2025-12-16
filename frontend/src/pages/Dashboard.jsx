import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotices } from '../api';

export default function Dashboard() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        loadNotices();
    }, []);

    const loadNotices = async () => {
        try {
            const data = await getNotices();
            // Sort by latest created
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotices(data);
        } catch (error) {
            console.error("Failed to fetch notices", error);
        }
    };

    return (
        <div>
            <div className="dashboard-header">
                <h1 className="page-title">Notice Dashboard</h1>
                <div style={{ color: 'var(--text-secondary)' }}>
                    Total: {notices.length}
                </div>
            </div>

            <div className="notice-grid">
                {notices.map((notice) => (
                    <Link to={`/notice/${notice.id}`} key={notice.id} className="notice-card">
                        <div className="card-header">
                            <span className={`badge ${notice.status.toLowerCase()}`}>
                                {notice.status}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {new Date(notice.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 className="card-title">{notice.title}</h3>
                        <div className="card-info">
                            <span>{notice.writerId}</span>
                            <span style={{
                                color: notice.importance === 'HIGH' ? 'var(--danger-color)' : 'inherit',
                                fontWeight: notice.importance === 'HIGH' ? 'bold' : 'normal'
                            }}>
                                {notice.importance}
                            </span>
                        </div>
                    </Link>
                ))}
                {notices.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        No notices found. <Link to="/write" style={{ color: 'var(--primary-color)' }}>Create your first notice</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
