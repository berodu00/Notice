import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/notices',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getNotices = async () => {
    const response = await api.get('');
    return response.data;
};

export const registerNotice = async (noticeData) => {
    const response = await api.post('/register', noticeData);
    return response.data;
};

export const approveNotice = async (noticeId, approvalData) => {
    const response = await api.post(`/${noticeId}/approve`, approvalData);
    return response.data;
};

export default api;
