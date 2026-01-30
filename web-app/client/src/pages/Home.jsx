import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import gauriImg from '../assets/Gauri.jpg';
import FloatingBubbles from '../components/FloatingBubbles';

const Home = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            axios.get('/api/reports')
                .then(res => setReports(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user]);

    // Reusable Section Component
    const Section = ({ title, children, bg = 'transparent' }) => (
        <section style={{ padding: '80px 20px', background: bg }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold' }}>{title}</h2>
                {children}
            </div>
        </section>
    );

    return (
        <div className="animate-fade-in">
            {/* HER HERO SECTION */}
            <div style={{
                height: '90vh',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("/hero_bg.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                marginTop: '-80px' // Offset navbar height to be full screen
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '20px', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
                        Help Us <span style={{ color: 'var(--color-primary)' }}>Help Them</span>
                    </h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px', textShadow: '1px 1px 5px rgba(0,0,0,0.5)' }}>
                        Every day, countless animals need rescue, nourishment, and love. Join our mission to give them a second chance.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/donate" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Donate Now</Link>
                        <Link to="/register" className="btn" style={{ padding: '15px 40px', fontSize: '1.1rem', background: 'white', color: 'black' }}>Become a Volunteer</Link>
                    </div>
                </div>
            </div>

            {/* DASHBOARD (IF LOGGED IN) */}
            {user && (
                <div style={{ padding: '40px 20px', background: 'var(--glass-bg)' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '2rem' }}>Welcome back, {user.name}</h2>
                            <Link to="/create-report" className="btn btn-primary">+ Report Animal</Link>
                        </div>

                        {loading ? (
                            <p>Loading your reports...</p>
                        ) : reports.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                                {reports.map(report => (
                                    <Link to={`/reports/${report._id}`} key={report._id} className="glass-card" style={{ display: 'block', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ height: '200px', background: '#334155', position: 'relative' }}>
                                            {report.imagePath ? (
                                                <img src={report.imagePath} alt={report.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No Image</div>
                                            )}
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', color: 'white' }}>
                                                {report.statusUpdates && report.statusUpdates.length > 0 ? report.statusUpdates[report.statusUpdates.length - 1].status : 'Pending'}
                                            </div>
                                        </div>
                                        <div style={{ padding: '20px' }}>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{report.title}</h3>
                                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{new Date(report.reportedAt).toLocaleDateString()}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p>You haven't reported any animals yet.</p>
                        )}
                    </div>
                </div>
            )}

            {/* WHAT WE DO SECTION */}
            <Section title="Our Impact">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Card 1 */}
                    <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚑</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Emergency Rescue</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            24/7 ambulance service for injured animals on the streets. We respond to accidents and critical distress calls.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🩺</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Medical Care</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            State-of-the-art veterinary clinic providing surgeries, vaccinations, and long-term treatments for rescued animals.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🐕</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Sterilization</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            Humane population control through "Neuter Today, Save Tomorrow" campaigns to prevent suffering.
                        </p>
                    </div>

                </div>
            </Section>

            {/* SUCCESS STORIES */}
            <Section title="Success Stories" bg="rgba(0,0,0,0.1)">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80" alt="Dog Recovery" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Bella's Journey</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Found with a broken leg on the highway, Bella made a full recovery after 2 months of intensive care and is now happily adopted.</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80" alt="Cat Rescue" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Luna's Miracle</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Luna was malnourished and weak. Today, she is the queen of our shelter, healthy, playful, and waiting for her forever home.</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <img src={gauriImg} alt="Cow Rescue" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Gauri's New Life</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Rescued from illegal transport, Gauri now lives peacefully in our sanctuary, safe and loved by all volunteers.</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* FLOATING BUBBLES SECTION */}
            <FloatingBubbles />

            {/* ABOUT US SECTION - REDESIGNED */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '100px 0' }}>
                <div className="container responsive-flex">

                    {/* Text Side */}
                    <div style={{ flex: 1, minWidth: '300px' }} className="responsive-full-width">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>One Paw at a Time</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '30px' }}>
                            Founded in 2010, Animal Lifeline has grown from a small group of volunteers to a full-fledged sanctuary. We believe that every species has the right to live with dignity. Our shelter is home to over 500 animals, including dogs, cats, cows, and donkeys.
                        </p>
                        <Link to="/register" className="btn btn-secondary">Join Our Team</Link>
                    </div>

                    {/* Image Side */}
                    <div style={{ flex: 1, minWidth: '300px' }} className="responsive-full-width">
                        <img
                            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80"
                            alt="Volunteer with cat"
                            style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', objectFit: 'cover', maxHeight: '400px' }}
                        />
                    </div>
                </div>
            </div>

            {/* CTA / DONATE */}
            <Section title="Be Their Voice">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--color-text-muted)' }}>
                        We rely entirely on donations from compassionate individuals like you. Your contribution funds medicines, food, and shelter for those who cannot ask for it themselves.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="glass-card" style={{ padding: '20px 40px', fontSize: '1.2rem', border: '1px solid var(--color-primary)', background: 'transparent', cursor: 'pointer', color: 'white' }}>
                            Sponsor a Meal
                        </button>
                        <button className="glass-card" style={{ padding: '20px 40px', fontSize: '1.2rem', border: '1px solid var(--color-primary)', background: 'transparent', cursor: 'pointer', color: 'white' }}>
                            Sponsor Treatment
                        </button>
                        <Link to="/donate" className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '1.2rem' }}>
                            Donate Any Amount
                        </Link>
                    </div>
                </div>
            </Section>

        </div>
    );
};

export default Home;
