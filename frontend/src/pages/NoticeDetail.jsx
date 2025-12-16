import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNotices, approveNotice } from '../api';

export default function NoticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        // Ideally we should have a getNoticeById API, but we can reuse the list for now or filter
        // For this demo, let's fetch all and filter (for simplicity as user didn't request getById stub)
        loadNotice();
    }, [id]);

    const loadNotice = async () => {
        const notices = await getNotices();
        const found = notices.find(n => n.id === parseInt(id));
        setNotice(found);
    };

    const handleApproval = async (approved) => {
        if (!confirm(approved ? 'Approve this notice?' : 'Reject this notice?')) return;

        try {
            await approveNotice(id, {
                approverId: 'manager_01', // Hardcoded
                comments: approved ? 'Approved via Dashboard' : 'Rejected via Dashboard',
                approved
            });
            alert(`Notice ${approved ? 'Approved' : 'Rejected'}`);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Operation failed');
        }
    };

    if (!notice) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>;

    return (
        <div className="detail-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h1 style={{ margin: 0 }}>{notice.title}</h1>
                <span className={`badge ${notice.status.toLowerCase()}`}>{notice.status}</span>
            </div>

            <div className="meta-row">
                <span>Writer: <strong>{notice.writerId}</strong></span>
                <span>|</span>
                <span>Date: {new Date(notice.createdAt).toLocaleString()}</span>
                <span>|</span>
                <span>Type: {notice.noticeType}</span>
            </div>

            <div className="content-body">
                {notice.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>

            {notice.status === 'PENDING' && (
                <div className="action-bar">
                    <button className="btn-reject" onClick={() => handleApproval(false)}>Reject</button>
                    <button className="btn-approve" onClick={() => handleApproval(true)}>Approve & Send</button>
                </div>
            )}
        </div>
    );
}
