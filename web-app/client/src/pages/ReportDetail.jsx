import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LocationPicker from '../components/LocationPicker';

const ReportDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    // Status Update Form
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchReport();
    }, [id]);

    const fetchReport = () => {
        axios.get(`/api/reports/${id}`)
            .then(res => setReport(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await axios.post(`/api/reports/${id}/status`, { status, comment });
            setStatus('');
            setComment('');
            fetchReport(); // Refresh data
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '120px' }}>Loading...</div>;
    if (!report) return <div className="container" style={{ paddingTop: '120px' }}>Report not found</div>;

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
            <div className="responsive-grid-2">
                <div>
                    {report.imagePath && (
                        <img src={report.imagePath} alt={report.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
                    )}
                </div>
                <div>
                    <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{report.title}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '20px' }}>{report.location}</p>
                    <div className="glass-card" style={{ padding: '20px', marginBottom: '30px' }}>
                        <p>{report.description}</p>
                        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Reported by {report.user?.name} on {new Date(report.reportedAt).toLocaleDateString()}</p>
                    </div>

                    {report.latitude && report.longitude && (
                        <div className="glass-card" style={{ padding: '20px', marginBottom: '30px' }}>
                            <h4 style={{ marginBottom: '15px' }}>Location Map</h4>
                            <LocationPicker initialPosition={[report.latitude, report.longitude]} />
                        </div>
                    )}

                    <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Status Updates</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {report.statusUpdates && report.statusUpdates.map(update => (
                            <div key={update._id || update.updatedAt} className="glass-card" style={{ padding: '15px', borderLeft: '4px solid var(--color-primary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{update.status}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(update.updatedAt).toLocaleString()}</span>
                                </div>
                                <p>{update.comment}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '5px' }}>Updated by {update.user?.name}</p>
                            </div>
                        ))}
                    </div>

                    {user && (user.role === 'Admin' || user.role === 'Volunteer' || user._id === report.user._id) && (
                        <div className="glass-card" style={{ padding: '20px', marginTop: '30px' }}>
                            <h4 style={{ marginBottom: '15px' }}>Add Update</h4>
                            <form onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                        <option value="" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>Select Status</option>
                                        <option value="In Progress" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>In Progress</option>
                                        <option value="Rescued" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>Rescued</option>
                                        <option value="Resolved" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>Resolved</option>
                                        <option value="Closed" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>Closed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-textarea" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={updating}>Update Status</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportDetail;
