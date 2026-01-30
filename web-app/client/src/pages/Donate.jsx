import { Link } from 'react-router-dom';

const Donate = () => {
    return (
        <div className="animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            {/* Header Section */}
            <div className="container" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>Make a Difference Today</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    Your contribution directly saves lives. From emergency surgeries to daily meals, every rupee counts.
                </p>
            </div>

            <div className="container responsive-grid-2">

                {/* Visual Section */}
                <div>
                    <div className="glass-card" style={{ padding: '20px', marginBottom: '30px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
                            alt="Happy rescued dogs"
                            style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
                        />
                        <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', textAlign: 'center' }}>"Thanks to donors like you, Max can run again."</p>
                    </div>
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Why Donate?</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>💉 <span style={{ marginLeft: '10px' }}>Vaccinations & Medical Care</span></li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>🚑 <span style={{ marginLeft: '10px' }}>Ambulance Fuel & Maintenance</span></li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>🥣 <span style={{ marginLeft: '10px' }}>Nutritious Food for 500+ Animals</span></li>
                            <li style={{ display: 'flex', alignItems: 'center' }}>🏠 <span style={{ marginLeft: '10px' }}>Shelter Maintenance</span></li>
                        </ul>
                    </div>
                </div>

                {/* Donation Form / QR */}
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--color-primary)' }}>Scan to Pay</h2>

                    <div style={{ background: 'white', padding: '20px', borderRadius: '20px', display: 'inline-block', marginBottom: '30px' }}>
                        <img src="/upi_qr.png" alt="UPI QR Code" style={{ width: '250px', height: '250px' }} />
                    </div>

                    <p style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: 'bold' }}>UPI ID: donate@animallifeline</p>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>Supported Apps: GPay, PhonePe, Paytm, BHIM</p>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                        <p style={{ marginBottom: '20px' }}>Or Bank Transfer:</p>
                        <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px' }}>
                            <p><strong>Account Name:</strong> Animal Lifeline Foundation</p>
                            <p><strong>Account No:</strong> 1234567890</p>
                            <p><strong>IFSC:</strong> ANML0001234</p>
                            <p><strong>Bank:</strong> City Bank</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Impact Images */}
            <div className="container" style={{ marginTop: '80px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Your Impact in Pictures</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <img src="https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&q=80" alt="Feeding stray dogs" style={{ width: '100%', borderRadius: '10px', height: '200px', objectFit: 'cover' }} />
                    <img src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80" alt="Rescued puppy" style={{ width: '100%', borderRadius: '10px', height: '200px', objectFit: 'cover' }} />
                    <img src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&q=80" alt="Vet care" style={{ width: '100%', borderRadius: '10px', height: '200px', objectFit: 'cover' }} />
                    <img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80" alt="Shelter life" style={{ width: '100%', borderRadius: '10px', height: '200px', objectFit: 'cover' }} />
                </div>
            </div>
        </div>
    );
};

export default Donate;
