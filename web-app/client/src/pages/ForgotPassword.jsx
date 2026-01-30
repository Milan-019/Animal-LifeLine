import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/forgot-password', { email });
            setMessage('Reset link sent to your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset link');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <h2 className="page-title" style={{ textAlign: 'center', fontSize: '2rem' }}>Reset Password</h2>
                {message && <div style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{message}</div>}
                {error && <div style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fca5a5', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
