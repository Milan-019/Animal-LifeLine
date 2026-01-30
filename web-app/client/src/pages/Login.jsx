import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '150px', paddingBottom: '100px', display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 300px)' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px', backdropFilter: 'blur(16px) saturate(180%)', background: 'rgba(17, 25, 40, 0.75)', border: '1px solid rgba(255, 255, 255, 0.125)' }}>
                <h2 className="page-title" style={{ textAlign: 'center', fontSize: '2rem' }}>Welcome Back</h2>
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
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Login</button>
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    Don't have an account? <a href="/register" style={{ color: 'var(--color-primary)' }}>Register</a>
                    <br />
                    <a href="/forgot-password" style={{ color: 'var(--color-text-muted)' }}>Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
