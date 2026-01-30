import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1491485880348-85d48a9e5312?auto=format&fit=crop&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTop: '1px solid var(--glass-border)',
            padding: '60px 20px',
            marginTop: '0px',
            color: 'white'
        }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>

                {/* Brand */}
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px' }}>
                        Animal <span style={{ color: 'var(--color-primary)' }}>Lifeline</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                        Dedicated to the rescue, rehabilitation, and care of stray and abandoned animals. Join us in making a difference, one paw at a time.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Quick Links</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}><Link to="/" className="nav-link">Home</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/register" className="nav-link">Volunteer</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/create-report" className="nav-link">Report Animal</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/donate" className="nav-link">Donate</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Contact Us</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '10px' }}>📍 123 Rescue Lane, Animal City</p>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '10px' }}>📞 +91 98765 43210</p>
                    <p style={{ color: 'var(--color-text-muted)' }}>✉️ help@animallifeline.org</p>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Newsletter</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="form-input"
                            style={{ padding: '10px', borderRadius: '5px' }}
                        />
                        <button className="btn btn-primary" style={{ padding: '10px 20px' }}>Sub</button>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Animal Lifeline Foundation. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
