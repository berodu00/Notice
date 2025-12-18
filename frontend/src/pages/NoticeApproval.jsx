import { useEffect, useState } from 'react';
import { getNotices, approveNotice } from '../api';
import { Link } from 'react-router-dom';

export default function NoticeApproval() {
    const [pendingNotices, setPendingNotices] = useState([]);

    useEffect(() => {
        loadNotices();
    }, []);

    const loadNotices = async () => {
        try {
            const data = await getNotices();
            // Filter only PENDING
            const pending = data.filter(n => n.status === 'PENDING');
            pending.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPendingNotices(pending);
        } catch (error) {
            console.error("Failed to fetch notices", error);
        }
    };

    const handleQuickApprove = async (id) => {
        if (!window.confirm("빠른 승인 처리를 하시겠습니까?")) return;
        try {
            await approveNotice({
                noticeId: id,
                approverId: 'ADMIN', // Mock
                action: 'APPROVE',
                comments: 'Quick approval via list'
            });
            alert("승인되었습니다.");
            loadNotices();
        } catch (error) {
            alert("처리 실패");
        }
    };

    return (
        <div>
            <h2 className="section-title">공지 발송 결재 (대기 목록)</h2>
            <div className="section-card">
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>상태</th>
                                <th>제목</th>
                                <th>유형</th>
                                <th>요청자</th>
                                <th>요청일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingNotices.map((notice) => (
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
                                    <td>{notice.noticeType}</td>
                                    <td>{notice.writerId}</td>
                                    <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleQuickApprove(notice.id)}
                                            style={{
                                                padding: '4px 12px',
                                                background: 'var(--primary-color)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            승인
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {pendingNotices.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>승인 대기 중인 공지가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
