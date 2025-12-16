import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNotice } from '../api';

export default function WriteNotice() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        noticeType: 'GENERAL',
        importance: 'NORMAL',
        writerId: 'admin', // Hardcoded for demo
        recipients: 'all@company.com',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        isRegularSend: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerNotice(formData);
            alert('Notice created successfully! Waiting for approval.');
            navigate('/');
        } catch (error) {
            console.error('Failed to register notice', error);
            alert('Failed to register notice.');
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Create New Notice</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter notice title"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Type</label>
                        <select name="noticeType" className="form-select" value={formData.noticeType} onChange={handleChange}>
                            <option value="GENERAL">General</option>
                            <option value="SYSTEM_MAINTENANCE">System Maintenance</option>
                            <option value="SECURITY">Security</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Importance</label>
                        <select name="importance" className="form-select" value={formData.importance} onChange={handleChange}>
                            <option value="LOW">Low</option>
                            <option value="NORMAL">Normal</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Recipients</label>
                    <input
                        type="text"
                        name="recipients"
                        className="form-input"
                        value={formData.recipients}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Content</label>
                    <textarea
                        name="content"
                        className="form-textarea"
                        rows="5"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your notice details here..."
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn-submit">Submit for Approval</button>
            </form>
        </div>
    );
}
