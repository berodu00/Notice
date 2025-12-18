import { useEffect, useState } from 'react';
import { getNotices } from '../api';
import { Link } from 'react-router-dom';

export default function NoticeHistory() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        loadNotices();
    }, []);

    const loadNotices = async () => {
        try {
            const data = await getNotices();
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotices(data);
        } catch (error) {
            console.error("Failed to fetch notices", error);
        }
    };

    return (
        <div>
            <h2 className="section-title">공지 발송 History</h2>
            <div className="section-card">
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>상태</th>
                                <th>제목</th>
                                <th>중요도</th>
                                <th>작성자</th>
                                <th>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((notice) => (
                                <tr key={notice.id}>
                                    <td>
                                        <span className={`status-badge ${notice.status.toLowerCase()}`}>
                                            {notice.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/notice/${notice.id}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
                                            {notice.title}
                                        </Link>
                                    </td>
                                    <td style={{
                                        color: notice.importance === 'HIGH' ? 'var(--danger-color)' : 'inherit',
                                        fontWeight: notice.importance === 'HIGH' ? '600' : '400'
                                    }}>
                                        {notice.importance}
                                    </td>
                                    <td>{notice.writerId}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>
                                        {new Date(notice.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {notices.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>데이터가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
