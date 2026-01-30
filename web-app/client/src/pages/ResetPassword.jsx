import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post('/api/users/reset-password', { token, newPassword });
            setMessage('Password reset successful. Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <h2 className="page-title" style={{ textAlign: 'center', fontSize: '2rem' }}>New Password</h2>
                {message && <div style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{message}</div>}
                {error && <div style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fca5a5', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength="8"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
