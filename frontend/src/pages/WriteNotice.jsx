import { useState } from 'react';
import { registerNotice } from '../api';
import { useNavigate } from 'react-router-dom';

export default function WriteNotice() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        noticeType: 'GENERAL',
        importance: 'NORMAL',
        writerId: 'admin', // Mock
        startDateTime: '',
        endDateTime: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Transform date strings to ISO-8601 LocalDateTime format (if provided)
            const scheduleData = (formData.startDateTime && formData.endDateTime) ? {
                startDateTime: formData.startDateTime, // e.g., "2023-12-25T10:00"
                endDateTime: formData.endDateTime,
                isRegular: false
            } : null;

            await registerNotice({
                title: formData.title,
                content: formData.content,
                noticeType: formData.noticeType,
                importance: formData.importance,
                recipients: 'ALL', // Default
                writerId: formData.writerId,
                schedule: scheduleData
            });

            alert('공지가 성공적으로 등록되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('Registration failed', error);
            alert('공지 등록에 실패했습니다. 입력 값을 확인해주세요.');
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>공지 등록</h2>

            <form onSubmit={handleSubmit} className="write-form-container">
                <table className="write-form-table">
                    <tbody>
                        <tr>
                            <th>제목 <span style={{ color: 'red' }}>*</span></th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    name="title"
                                    className="form-input"
                                    placeholder="공지 제목을 입력하세요"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>공지 유형</th>
                            <td>
                                <select name="noticeType" className="form-select" value={formData.noticeType} onChange={handleChange}>
                                    <option value="GENERAL">일반 공지 (General)</option>
                                    <option value="SYSTEM_MAINTENANCE">시스템 점검 (Maintenance)</option>
                                    <option value="SECURITY">보안 (Security)</option>
                                </select>
                            </td>
                            <th>중요도</th>
                            <td>
                                <select name="importance" className="form-select" value={formData.importance} onChange={handleChange}>
                                    <option value="NORMAL">보통 (Normal)</option>
                                    <option value="HIGH">높음 (High)</option>
                                    <option value="LOW">낮음 (Low)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input
                                    type="text"
                                    name="writerId"
                                    className="form-input"
                                    value={formData.writerId}
                                    readOnly
                                    style={{ backgroundColor: '#f3f4f6' }}
                                />
                            </td>
                            <th>게시 기간 설정</th>
                            <td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="datetime-local"
                                    name="startDateTime"
                                    className="form-input"
                                    value={formData.startDateTime}
                                    onChange={handleChange}
                                />
                                <span>~</span>
                                <input
                                    type="datetime-local"
                                    name="endDateTime"
                                    className="form-input"
                                    value={formData.endDateTime}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용 <span style={{ color: 'red' }}>*</span></th>
                            <td colSpan="3">
                                <textarea
                                    name="content"
                                    className="form-textarea"
                                    placeholder="공지 내용을 상세히 입력하세요..."
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>첨부파일</th>
                            <td colSpan="3">
                                <input type="file" className="form-input" />
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '5px' }}>
                                    * 최대 10MB까지 업로드 가능합니다.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="form-actions">
                    <button type="submit" className="btn-submit">저장</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate('/')}>취소</button>
                </div>
            </form>
        </div>
    );
}
