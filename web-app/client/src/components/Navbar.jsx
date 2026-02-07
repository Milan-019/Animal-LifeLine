import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/react.svg';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px',
                flexWrap: 'wrap', // Allow wrapping on very small screens
                overflowX: 'auto' // Allow horizontal scroll if needed
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    marginRight: '20px'
                }}>
                    <img src={logo} alt="Logo" style={{ height: '30px', width: 'auto' }} />
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        background: 'var(--gradient-main)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        whiteSpace: 'nowrap'
                    }}>
                        Animal Lifeline
                    </span>
                </Link>
                <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/" style={{ color: 'var(--color-text)', fontWeight: '500', whiteSpace: 'nowrap' }}>Home</Link>
                    {user && (
                        <Link to="/create-report" style={{ color: 'var(--color-text)', fontWeight: '500', whiteSpace: 'nowrap' }}>Report</Link>
                    )}
                    {user && (user.role === 'Admin' || user.role === 'Volunteer') && (
                        <Link to="/admin" style={{ color: 'var(--color-text)', fontWeight: '500', whiteSpace: 'nowrap' }}>Admin</Link>
                    )}
                </div>
                <div className="nav-auth" style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
                    {user ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ color: 'var(--color-text-muted)', display: 'none' /* Hide name on mobile to save space */ }}>Hello, {user.name}</span>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
